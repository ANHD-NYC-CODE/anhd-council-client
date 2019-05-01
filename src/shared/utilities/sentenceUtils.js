import moment from 'moment'
import _ from 'lodash'

import {
  singular,
  grammaticalList,
  longAmountComparisonString,
  constructDateComparisonString,
  grammaticalNoun,
  stringWithComparisonStringsToSymbol,
} from 'shared/utilities/languageUtils'

///////////////////
// Summary Sentence

export const constructSummaryFilterSentence = ({ request, resultsFilter }) => {
  const filterSegment = resultsFilter ? resultsFilter.label + ' Properties' : 'All Properties'

  const datasetSegment = !!request && Object.keys(request).length ? ' w/ ' + request.summaryCardLabel : ''

  return [filterSegment, datasetSegment].join(' ').trim()
}

//////////////////
// Advanced Sentence

export const constructAmountSentence = (dataset, comparison, value) => {
  return dataset.amountSentenceParser(dataset, comparison, value)
}

const parseParamMapComparison = (paramMap, nounOverride = undefined) => {
  if (!paramMap || !paramMap.value) return
  switch (paramMap.type) {
    case 'AMOUNT':
      return `${paramMap.comparisonPrefix} ${longAmountComparisonString(paramMap.comparison)} ${paramMap.valuePrefix}${
        paramMap.value
      }${paramMap.valueSuffix}${grammaticalNoun(nounOverride || paramMap.paramNoun, paramMap.value)}`.trim()
    case 'PERCENT':
      return `${paramMap.comparisonPrefix} ${longAmountComparisonString(paramMap.comparison)} ${paramMap.valuePrefix}${
        paramMap.value
      }${paramMap.valueSuffix}${grammaticalNoun(nounOverride || paramMap.paramNoun, paramMap.value)}`.trim()
    case 'DATE':
      return [
        paramMap.comparisonPrefix.trim(),
        paramMap.valuePrefix.trim(),
        constructDateComparisonString(paramMap.comparison).trim(),
        moment(paramMap.value, 'YYYY-MM-DD')
          .format('MM/DD/YYYY')
          .trim(),
      ]
        .filter(s => s)
        .join(' ')
        .trim()
    case 'YEAR':
      return [
        paramMap.comparisonPrefix.trim(),
        paramMap.valuePrefix,
        constructDateComparisonString(paramMap.comparison).trim(),
        paramMap.value,
      ]
        .filter(s => s)
        .join(' ')
        .trim()
    case 'TEXT':
      return [
        paramMap.comparisonPrefix,
        paramMap.valuePrefix,
        paramMap.value,
        paramMap.valueSuffix,
        nounOverride || paramMap.paramNoun,
      ]
        .filter(p => p)
        .join(' ')
    case 'SINGLE-TEXT':
      return [
        paramMap.comparisonPrefix,
        paramMap.valuePrefix,
        paramMap.options.find(option => option.value === paramMap.value).label.toLowerCase(),
        paramMap.valueSuffix,
        nounOverride || paramMap.paramNoun,
      ]
        .filter(p => p)
        .join(' ')
    case 'MULTI-TEXT':
      return `${paramMap.comparisonPrefix} ${grammaticalList(paramMap.value.split(','), 'or')}`.trim()
    case 'BOOL':
      return [paramMap.value === '0' ? 'no' : '', nounOverride || paramMap.paramNoun].filter(p => p).join(' ')
  }
}

const parseParamMapRangeGroup = paramMapRangeGroup => {
  const gte = paramMapRangeGroup.find(pm => pm.comparison.match(/(gte|start)/))
  const lte = paramMapRangeGroup.find(pm => pm.comparison.match(/(lte|end)/))
  switch (paramMapRangeGroup[0].type) {
    case 'DATE':
      return [
        paramMapRangeGroup[0].comparisonPrefix.trim(),
        'between',
        paramMapRangeGroup[0].valuePrefix.trim(),
        moment(gte.value)
          .format('MM/DD/YYYY')
          .trim(),
        'and',
        paramMapRangeGroup[0].valuePrefix.trim(),
        moment(lte.value)
          .format('MM/DD/YYYY')
          .trim(),
      ]
        .filter(s => s)
        .join(' ')
        .trim()

    case 'YEAR':
      return [
        paramMapRangeGroup[0].comparisonPrefix.trim(),
        'between',
        paramMapRangeGroup[0].valuePrefix.trim(),
        gte.value,
        'and',
        paramMapRangeGroup[0].valuePrefix.trim(),
        lte.value,
      ]
        .filter(s => s)
        .join(' ')
        .trim()
  }
}

const parseRoleGroup = (paramMaps, joiner = ' ') => {
  if (paramMaps.some(pm => !!pm.rangeKey)) {
    const rangeGroups = _.groupBy(paramMaps, pm => pm.rangeKey)
    return Object.values(rangeGroups)
      .map(group => {
        if (group.length === 2) {
          return parseParamMapRangeGroup(group.sort((a, b) => a.rangePosition < b.rangePosition))
        } else if (group.length === 1) {
          return parseParamMapComparison(group[0])
        }
      })
      .join(joiner)
  } else {
    return paramMaps.map(pm => parseParamMapComparison(pm)).join(' ')
  }
}

export const convertFilterToSentence = (filter, withModifiers = true) => {
  if (!filter) return
  if (filter.paramMaps.length) {
    // Get Primary
    const primaryParamMap = filter.paramMaps.find(pm => pm.role === 'PRIMARY')

    // Get Limiter
    const limiterParamMaps = filter.paramMaps.filter(pm => pm.role === 'LIMITER')

    const modifyingParamMaps = filter.paramMaps.filter(pm => pm.role !== 'PRIMARY' && pm.role !== 'LIMITER')

    const parsedModifyingParamMaps = parseRoleGroup(modifyingParamMaps, ', ').trim()

    const primaryLeadingWord = primaryParamMap.resourceModel.resourceConstant !== 'PROPERTY' ? 'have' : undefined
    const primarySegment = primaryParamMap
      ? `${parseParamMapComparison(primaryParamMap, filter.resourceModel.sentenceNoun)}`.trim()
      : undefined

    const modifyingSegment = parsedModifyingParamMaps.length ? `(${parsedModifyingParamMaps})`.trim() : undefined

    const limiterSegment = limiterParamMaps.length ? parseRoleGroup(limiterParamMaps).trim() : undefined

    return [primaryLeadingWord, primarySegment, withModifiers ? modifyingSegment : null, limiterSegment]
      .filter(p => p)
      .join(' ')
      .trim()
  } else {
    return ''
  }
}

export const convertConditionToSentence = (conditions, condition) => {
  const leadingWord = condition.type === 'AND' ? ' that' : ' that either'
  const conditionFilterSegments = condition.filters
    .map((filter, index) => {
      if (filter.conditionGroup) {
        return `${convertConditionToSentence(conditions, conditions[filter.conditionGroup])}${
          condition.filters[index + 1] ? addNextFilterFill(condition, condition.filters[index + 1]) : ''
        }`.trim()
      } else {
        return `${convertFilterToSentence(filter)}${
          condition.filters[index + 1] ? addNextFilterFill(condition, condition.filters[index + 1]) : ''
        }`.trim()
      }
    })
    .join(' ')

  return [leadingWord, conditionFilterSegments].join(' ')
}

const addNextFilterFill = (condition, filter) => {
  return filter.conditionGroup ? constructConditionFill(condition) : constructFilterSentenceFill(condition)
}

const constructFilterSentenceFill = condition => {
  return condition.type === 'AND' ? ' and' : ' or'
}

const constructConditionFill = condition => {
  return condition.type === 'AND' ? ' and' : ' or'
}

export const convertConditionMappingToSentence = conditions => {
  if (!(Object.keys(conditions).length && conditions['0'].filters.length)) return ''
  return `${convertConditionToSentence(conditions, conditions['0'])}.`
}

export const convertGeographiesToSentence = geographies => {
  return `in ${
    geographies.length
      ? geographies
          .map(geography => `${geography.name.toLowerCase()} ${geography.id ? geography.id : '_'}`)
          .filter(p => p)
          .join(' and ')
          .trim()
      : '...'
  }`
}

export const convertHousingTypesToSentence = housingTypes => {
  return `${grammaticalList(
    housingTypes.map(housingType => {
      return singular(housingType.name).toLowerCase() + ' properties' + convertFilterToSentence(housingType)
    }),
    'and'
  )}`
}

const convertFiltertoCsvFileName = filter => {
  const primaryParamMap = filter.paramMaps.find(pm => pm.role === 'PRIMARY')

  // Get Limiter
  const limiterParamMaps = filter.paramMaps.filter(pm => pm.role === 'LIMITER')

  const modifyingParamMaps = filter.paramMaps.filter(pm => pm.role !== 'PRIMARY' && pm.role !== 'LIMITER')

  const parsedModifyingParamMaps = parseRoleGroup(modifyingParamMaps, ', ').trim()

  const modifyingSegment = parsedModifyingParamMaps.length ? `(${parsedModifyingParamMaps})`.trim() : undefined

  const limiterSegment = limiterParamMaps.length ? parseRoleGroup(limiterParamMaps).trim() : undefined

  return [primaryParamMap.summaryString, stringWithComparisonStringsToSymbol(modifyingSegment), limiterSegment]
    .filter(f => f)
    .join('_')
}

export const convertConditionMappingToCsvFileName = (condition, conditions) => {
  return `(${condition.filters
    .map(f => {
      if (f.conditionGroup) {
        return convertConditionMappingToCsvFileName(conditions[f.conditionGroup])
      } else {
        return convertFiltertoCsvFileName(f)
      }
    })
    .filter(f => f)
    .join(`_${condition.type.toUpperCase()}_`)})`
}

export const constructSentence = advancedSearch => {
  return [
    'Show me',
    convertFilterToSentence(advancedSearch.propertyFilter),
    convertGeographiesToSentence(advancedSearch.geographies),
    convertConditionMappingToSentence(advancedSearch.conditions),
  ]
    .filter(p => p)
    .join(' ')
    .trim()
}

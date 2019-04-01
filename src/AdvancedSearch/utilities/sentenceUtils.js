import moment from 'moment'
import _ from 'lodash'

import {
  singular,
  grammaticalList,
  longAmountComparisonString,
  constructDateComparisonString,
  grammaticalNoun,
} from 'shared/utilities/languageUtils'
//////////////////
// Sentence

export const constructAmountSentence = (dataset, comparison, value) => {
  return dataset.amountSentenceParser(dataset, comparison, value)
}

const parseParamMapComparison = (paramMap, nounOverride = undefined) => {
  if (!paramMap || !paramMap.value) return
  console.log(paramMap.value)
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
      return `${paramMap.comparisonPrefix} ${paramMap.valuePrefix} ${constructDateComparisonString(
        paramMap.comparison
      )} ${moment(paramMap.value).format('MM/DD/YYYY')}`.trim()
    case 'YEAR':
      return `${paramMap.comparisonPrefix} ${paramMap.valuePrefix} ${constructDateComparisonString(
        paramMap.comparison
      )} ${paramMap.value}`.trim()
    case 'TEXT':
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
  }
}

const parseParamMapRangeGroup = paramMapRangeGroup => {
  const gte = paramMapRangeGroup.find(pm => pm.comparison.match(/(gte|start)/))
  const lte = paramMapRangeGroup.find(pm => pm.comparison.match(/(lte|end)/))
  switch (paramMapRangeGroup[0].type) {
    case 'DATE':
      return `between ${moment(gte.value).format('MM/DD/YYYY')} and ${moment(lte.value).format('MM/DD/YYYY')}`
    case 'YEAR':
      return `between ${gte.value} and ${lte.value}`
  }
}

const parseRoleGroup = paramMaps => {
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
      .join(' ')
  } else {
    return paramMaps.map(pm => parseParamMapComparison(pm)).join(' ')
  }
}

export const convertFilterToSentence = filter => {
  if (Object.keys(filter.paramMaps).length) {
    // Get Primary
    const primaryParamMap = filter.paramMaps.find(pm => pm.role === 'PRIMARY')

    // Get Limiter
    const limiterParamMaps = filter.paramMaps.filter(pm => pm.role === 'LIMITER')

    const modifyingParamMaps = filter.paramMaps.filter(pm => pm.role !== 'PRIMARY' && pm.role !== 'LIMITER')

    const parsedModifyingParamMaps = modifyingParamMaps.map(pm => parseParamMapComparison(pm))

    const primaryLeadingWord = primaryParamMap.resourceModel.resourceConstant === 'PROPERTY' ? '' : 'have'
    const primarySegment = primaryParamMap
      ? `${primaryLeadingWord} ${parseParamMapComparison(primaryParamMap, filter.resourceModel.sentenceNoun)}`
      : undefined

    const modifyingSegment = parsedModifyingParamMaps.length ? `(${parsedModifyingParamMaps.join(', ')})` : undefined

    const limiterSegment = limiterParamMaps.length ? `${parseRoleGroup(limiterParamMaps)}` : undefined
    return ' ' + [primarySegment, modifyingSegment, limiterSegment].filter(p => p).join(' ')
  } else {
    return ''
  }
}

export const convertConditionToSentence = (conditions, condition) => {
  return `${condition.type === 'AND' ? ' that' : ' that either'}${condition.filters
    .map((filter, index) => {
      if (filter.conditionGroup) {
        return `${convertConditionToSentence(conditions, conditions[filter.conditionGroup])}${
          condition.filters[index + 1] ? addNextFilterFill(condition, condition.filters[index + 1]) : ''
        }`
      } else {
        return `${convertFilterToSentence(filter)}${
          condition.filters[index + 1] ? addNextFilterFill(condition, condition.filters[index + 1]) : ''
        }`
      }
    })
    .join('')}`
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
          .join(' and ')
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

export const constructSentence = advancedSearch => {
  return `Show me ${[
    convertFilterToSentence(advancedSearch.propertyFilter),
    // convertHousingTypesToSentence(advancedSearch.housingTypes),
    convertGeographiesToSentence(advancedSearch.geographies),
  ].join(' ')} ${convertConditionMappingToSentence(advancedSearch.conditions)}`
}

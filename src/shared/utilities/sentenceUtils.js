import dayjs from 'dayjs'
import groupBy from 'lodash/groupBy'
import * as b from 'shared/constants/geographies'

import {
  singular,
  grammaticalList,
  longAmountComparisonString,
  constructDateComparisonString,

  constructRangeComparisonString,


  grammaticalNoun,
  stringWithComparisonStringsToSymbol,
  boroCodeToName,
  communityIdToString,
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
        constructDateComparisonString(paramMap.comparison, paramMap.defaultOptions)
          .trim()
          .toLowerCase(),
        dayjs(paramMap.value, 'YYYY-MM-DD')
          .format('MM/DD/YYYY')
          .trim(),
      ]
        .filter(s => s)
        .join(' ')
        .trim()
  // TEST /////////////////////////////////////////////////
    // case 'RANGE':
    case 'AMOUNTRANGE':
      return [
        paramMap.comparisonPrefix.trim(),
        paramMap.valuePrefix.trim(),
        constructRangeComparisonString(paramMap.comparison, paramMap.defaultOptions)
          .trim()
          .toLowerCase(),
    
      ]
        .filter(s => s)
        .join(' ')
        .trim()
  // TEST /////////////////////////////////////////////////
    case 'YEAR':
      return [
        paramMap.comparisonPrefix.trim(),
        paramMap.valuePrefix,
        constructDateComparisonString(paramMap.comparison, paramMap.defaultOptions)
          .trim()
          .toLowerCase(),
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
        paramMap.options.find(option => option.value === paramMap.value).label,
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
  const gt = paramMapRangeGroup.find(pm => pm.comparison.match(/(gt)/))
  const lt = paramMapRangeGroup.find(pm => pm.comparison.match(/(lt)/))
  switch (paramMapRangeGroup[0].type) {
    case 'DATE':
      return [
        paramMapRangeGroup[0].comparisonPrefix.trim(),
        'between',
        paramMapRangeGroup[0].valuePrefix.trim(),
        dayjs(gte.value)
          .format('MM/DD/YYYY')
          .trim(),
        'and',
        paramMapRangeGroup[0].valuePrefix.trim(),
        dayjs(lte.value)
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
    case 'AMOUNT':
      return [
        paramMapRangeGroup[0].comparisonPrefix.trim(),
        'between',
        paramMapRangeGroup[0].valuePrefix.trim(),
        // gte.value,
        gt.value,
        'and',
        paramMapRangeGroup[0].valuePrefix.trim(),
        // lte.value,
        lt.value,
        // grammaticalNoun(lte.paramNoun, lte.value),
        grammaticalNoun(lt.paramNoun, lt.value),
      ]
        .filter(s => s)
        .join(' ')
        .trim()
// TEST
      case 'AMOUNTRANGE':
      return [
        paramMapRangeGroup[0].comparisonPrefix.trim(),
        'between',
        paramMapRangeGroup[0].valuePrefix.trim(),
        gt.value
          .trim(),
        'and',
        paramMapRangeGroup[0].valuePrefix.trim(),
        lte
          .trim(),
      ]
        .filter(s => s)
        .join(' ')
        .trim()

        // TEST
  }
}

const parseRoleGroup = (paramMaps, joiner = ' ') => {
  if (paramMaps.some(pm => !!pm.rangeKey)) {
    const rangeGroups = groupBy(paramMaps, pm => pm.rangeKey)
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
    return paramMaps.map(pm => parseParamMapComparison(pm)).join(', ')
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
  if (!geographies.length) return

  const geography = geographies[0]
  let geoString = ''
  if (geography.constant === b.BOROUGH_GEOGRAPHY.constant) {
    geoString = boroCodeToName(geography.id)
  } else if (geography.constant === b.CITY_GEOGRAPHY.constant) {
    geoString = b.CITY_GEOGRAPHY.name
  } else if (geography.constant === b.COMMUNITY_GEOGRAPHY.constant) {
    geoString = `${communityIdToString(geography.id)}`
  } else {
    geoString = `${geography.name.toLowerCase()} ${geography.id ? geography.id : '_'}`
  }

  return `in ${geoString}`
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

export const constructAdvancedSearchSentence = (advancedSearch, loading) => {
  return [
    loading ? 'Searching for' : 'Displaying',
    convertFilterToSentence(advancedSearch.propertyFilter),
    convertGeographiesToSentence(advancedSearch.geographies),
    convertConditionMappingToSentence(advancedSearch.conditions),
  ]
    .filter(p => p)
    .join(' ')
    .trim()
}

export const getNotificationFrequencyString = (f) => {
  switch(f) {
    case "D":
      return "Daily"
    case "W":
      return "Weekly"
    case "M":
      return "Monthly"
    default: 
      return "Never"
  }
}

export const getReadableDateTimeString = (f) => {
  const date = new Date(f)
  let dateString = "";
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November",
                      "December"];
  dateString += monthNames[date.getMonth()];
  dateString += " ";
  dateString += date.getDate();
  dateString += " ";
  dateString += date.getFullYear();
  dateString += " ";
  dateString += date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).slice(0, -2);
  dateString += " ";
  dateString += date.toLocaleTimeString().slice(-2).toLowerCase();
  return dateString;
}

export const getReadableDateString = (f) => {
  const date = new Date(f)
  let dateString = "";
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November",
                      "December"];
  dateString += monthNames[date.getMonth()];
  dateString += " ";
  dateString += date.getDate();
  dateString += " ";
  dateString += date.getFullYear();
  return dateString;
}

export const getReadableMonthString = (f) => {
  const date = new Date(f)
  let dateString = "";
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November",
                      "December"];
  dateString += monthNames[date.getMonth()];
  dateString += " ";
  dateString += date.getFullYear();
  return dateString;
}

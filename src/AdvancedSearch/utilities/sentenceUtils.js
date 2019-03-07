import moment from 'moment'
//////////////////
// Sentence

const grammaticalList = array => {
  let lastItem
  if (array.length > 1) {
    lastItem = array.pop()
  }

  const sentence = array.join(',')
  return lastItem ? sentence + ' and ' + lastItem : sentence
}

const singularPlease = string => {
  if (string.charAt(string.length - 1).toLowerCase() === 's') {
    return string.slice(0, -1)
  } else {
    return string
  }
}

export const constructComparisonString = comparison => {
  switch (comparison) {
    case 'gte':
      return 'at least'
    case 'exact':
      return 'exactly'
    case 'lte':
      return 'at most'
  }
}

export const constructAmountComparisonString = comparison => {
  switch (comparison) {
    case 'gte':
      return 'at least'
    case 'exact':
      return 'exactly'
    case 'lte':
      return 'at most'
  }
}

export const constructDateComparisonString = comparison => {
  switch (comparison) {
    case 'gte':
      return 'since'
    case 'lte':
      return 'before'
  }
}

export const constructAmountSentence = (dataset, comparison, value) => {
  return dataset.amountSentenceParser(dataset, comparison, value)
}

const parseParamMapComparison = paramMap => {
  switch (paramMap.languageModule.type) {
    case 'AMOUNT':
      return `${constructAmountComparisonString(paramMap.comparison)} ${
        paramMap.value
      } ${paramMap.languageModule.getNoun(paramMap.value)}`
    case 'DATE':
      return `${constructDateComparisonString(paramMap.comparison)} ${moment(paramMap.value).format('MM/DD/YYYY')}`
  }
}

const parseParamMapRangeGroup = paramMapRangeGroup => {
  switch (paramMapRangeGroup[0].languageModule.type) {
    case 'DATE':
      return `from ${moment(paramMapRangeGroup[0].value).format('MM/DD/YYYY')} to ${moment(
        paramMapRangeGroup[1].value
      ).format('MM/DD/YYYY')}`
  }
}

export const convertFilterToSentence = filter => {
  // converts an objects like:
  // const object = { dataset: ds, comparison: 'gte', value: '10', startDate '2017-01-01', endDate: '2018-01-01' }
  // into:
  // at least 10 HPD Violations between 01/01/2017 and 01/01/2018

  // let { dataset, comparison, value, startDate, endDate } = object
  return Object.keys(filter.paramsObject)
    .map(key => {
      const paramSet = filter.paramsObject[key]
      return paramSet.paramMaps
        .map(paramMap => {
          // Process range paramMap separately
          if (paramMap.rangeKey && paramSet.paramMaps.filter(pm => pm.rangeKey === paramMap.rangeKey).length === 2) {
            // Only process once with the first object
            if (paramMap.rangePosition === 1) {
              return parseParamMapRangeGroup(paramSet.paramMaps.filter(pm => pm.rangeKey === paramMap.rangeKey))
            }
          } else {
            return parseParamMapComparison(paramMap)
          }
        })
        .filter(p => p)
        .join(' ')
    })
    .join(' ')
}

export const convertConditionGroupToSentence = (conditions, condition) => {
  return condition.filters
    .map((filter, index) => {
      if (filter.conditionGroup) {
        return `${convertConditionGroupToSentence(conditions, conditions[filter.conditionGroup])}${
          condition.filters[index + 1] ? addNextFilterFill(condition, condition.filters[index + 1]) : ''
        }`
      } else {
        return `${convertFilterToSentence(filter)}${
          condition.filters[index + 1] ? addNextFilterFill(condition, condition.filters[index + 1]) : ''
        }`
      }
    })
    .join(' ')
}

const addNextFilterFill = (condition, filter) => {
  return filter.conditionGroup ? constructConditionFill(condition) : constructFilterSentenceFill(condition)
}

const constructFilterSentenceFill = condition => {
  return condition.type === 'AND' ? ' and' : ' or'
}

const constructConditionFill = condition => {
  return condition.type === 'AND' ? ' and that either have' : ' or that have'
}

export const convertConditionMappingToSentence = conditions => {
  if (!(Object.keys(conditions).length && conditions['0'].filters.length)) return '...'
  return `have ${convertConditionGroupToSentence(conditions, conditions['0'])}.`
}

export const convertBoundariesToSentence = boundaries => {
  return `in ${
    boundaries.length
      ? boundaries.map(boundary => `${boundary.name.toLowerCase()} ${boundary.id ? boundary.id : '_'}`).join(' and ')
      : '...'
  }`
}

const convertParamMapToSentence = paramMap => {
  return `${constructComparisonString(paramMap.comparison)} ${
    paramMap.value
  } ${paramMap.languageModule.noun.toLowerCase()}`
}

const convertParamSetToSentence = paramSet => {
  return `${grammaticalList(paramSet.paramMaps.map(paramMap => convertParamMapToSentence(paramMap)))}`
}

const constructHousingTypeParamSentence = housingType => {
  if (Object.keys(housingType.params).length) {
    return ` with ${Object.keys(housingType.paramsObject)
      .map(key => {
        return convertParamSetToSentence(housingType.paramsObject[key])
      })
      .join(' and ')}`
  } else {
    return ''
  }
}

export const convertHousingTypesToSentence = housingTypes => {
  return `${grammaticalList(
    housingTypes.map(
      housingType => singularPlease(housingType.name) + ' properties' + constructHousingTypeParamSentence(housingType)
    )
  )}`
}

export const constructSentence = advancedSearch => {
  return `Show me ${[
    convertHousingTypesToSentence(advancedSearch.housingTypes),
    convertBoundariesToSentence(advancedSearch.boundaries),
  ].join(' ')} that ${convertConditionMappingToSentence(advancedSearch.conditions)}`
}

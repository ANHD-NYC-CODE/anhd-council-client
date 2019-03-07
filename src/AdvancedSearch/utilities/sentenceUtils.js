import moment from 'moment'
//////////////////
// Sentence

const grammaticalList = (array, conjunction = 'and') => {
  let lastItem
  let sentence
  if (array.length === 2) {
    sentence = array.join(` ${conjunction} `)
  } else if (array.length > 2) {
    lastItem = array.pop()
    sentence = array.join(', ')
  } else {
    sentence = array[0]
  }

  return lastItem ? `${sentence}, ${conjunction} ${lastItem}` : sentence
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
      } ${paramMap.languageModule.grammaticalNoun(paramMap.languageModule.noun, paramMap.value)}`
    case 'DATE':
      return `${constructDateComparisonString(paramMap.comparison)} ${moment(paramMap.value).format('MM/DD/YYYY')}`
    case 'TEXT':
      return `${grammaticalList(paramMap.value.split(','), 'or')}`
  }
}

const parseParamMapRangeGroup = paramMapRangeGroup => {
  const gte = paramMapRangeGroup.find(pm => pm.comparison === 'gte')
  const lte = paramMapRangeGroup.find(pm => pm.comparison === 'lte')

  switch (paramMapRangeGroup[0].languageModule.type) {
    case 'DATE':
      return `between ${moment(gte.value).format('MM/DD/YYYY')} and ${moment(lte.value).format('MM/DD/YYYY')}`
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

export const convertConditionToSentence = (conditions, condition) => {
  return condition.filters
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
  return `have ${convertConditionToSentence(conditions, conditions['0'])}.`
}

export const convertBoundariesToSentence = boundaries => {
  return `in ${
    boundaries.length
      ? boundaries.map(boundary => `${boundary.name.toLowerCase()} ${boundary.id ? boundary.id : '_'}`).join(' and ')
      : '...'
  }`
}

const convertParamMapToSentence = paramMap => {
  return `${
    paramMap.languageModule.propertyAdjective ? paramMap.languageModule.propertyAdjective.toLowerCase() : 'with'
  } ${constructComparisonString(paramMap.comparison)} ${paramMap.value}${
    paramMap.languageModule.noun ? ' ' + paramMap.languageModule.noun.toLowerCase() : ''
  }`
}

const convertParamSetToSentence = paramSet => {
  return `${grammaticalList(paramSet.paramMaps.map(paramMap => convertParamMapToSentence(paramMap), 'and'))}`
}

const constructHousingTypeParamSentence = housingType => {
  if (Object.keys(housingType.params).length) {
    return ` ${Object.keys(housingType.paramsObject)
      .map(key => {
        const paramSet = housingType.paramsObject[key]
        return paramSet.paramMaps
          .map(paramMap => {
            // Process range paramMap separately
            let modifier = `${
              paramMap.languageModule.propertyAdjective
                ? paramMap.languageModule.propertyAdjective.toLowerCase()
                : 'with'
            } `
            let sentence = ''
            if (paramMap.rangeKey && paramSet.paramMaps.filter(pm => pm.rangeKey === paramMap.rangeKey).length === 2) {
              // Only process once with the first object
              if (paramMap.rangePosition === 1) {
                sentence = parseParamMapRangeGroup(paramSet.paramMaps.filter(pm => pm.rangeKey === paramMap.rangeKey))
              }
            } else {
              sentence = parseParamMapComparison(paramMap)
            }
            return sentence ? modifier + sentence : ''
          })
          .filter(p => p)
          .join(' ')
      })
      .filter(p => p)
      .join(' and ')}`
  } else {
    return ''
  }
}

export const convertHousingTypesToSentence = housingTypes => {
  return `${grammaticalList(
    housingTypes.map(
      housingType => singularPlease(housingType.name) + ' properties' + constructHousingTypeParamSentence(housingType),
      'and'
    )
  )}`
}

export const constructSentence = advancedSearch => {
  return `Show me ${[
    convertHousingTypesToSentence(advancedSearch.housingTypes),
    convertBoundariesToSentence(advancedSearch.boundaries),
  ].join(' ')} that ${convertConditionMappingToSentence(advancedSearch.conditions)}`
}

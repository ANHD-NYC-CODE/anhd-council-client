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
      return 'after'
    case 'start':
      return 'after'
    case 'lte':
      return 'before'
    case 'end':
      return 'before'
  }
}

export const constructAmountSentence = (dataset, comparison, value) => {
  return dataset.amountSentenceParser(dataset, comparison, value)
}

const parseParamMapComparison = paramMap => {
  switch (paramMap.type) {
    case 'AMOUNT':
      return `${constructAmountComparisonString(paramMap.comparison)} ${paramMap.languageModule.valuePrefix}${
        paramMap.value
      }${paramMap.languageModule.valueSuffix}${paramMap.languageModule.grammaticalNoun(
        paramMap.languageModule.noun,
        paramMap.value
      )}`
    case 'PERCENT':
      return `${constructAmountComparisonString(paramMap.comparison)} ${paramMap.languageModule.valuePrefix}${
        paramMap.value
      }${paramMap.languageModule.valueSuffix}${paramMap.languageModule.grammaticalNoun(
        paramMap.languageModule.noun,
        paramMap.value
      )}`
    case 'DATE':
      return `${constructDateComparisonString(paramMap.comparison)} ${moment(paramMap.value).format('MM/DD/YYYY')}`
    case 'YEAR':
      return `${constructDateComparisonString(paramMap.comparison)} ${paramMap.value}`
    case 'TEXT':
      return `${grammaticalList(paramMap.value.split(','), 'or')}`
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

export const convertBoundariesToSentence = boundaries => {
  return `in ${
    boundaries.length
      ? boundaries.map(boundary => `${boundary.name.toLowerCase()} ${boundary.id ? boundary.id : '_'}`).join(' and ')
      : '...'
  }`
}

export const convertFilterToSentence = filter => {
  if (Object.keys(filter.params).length) {
    return ` ${Object.keys(filter.paramSets)
      .map(key => {
        const paramSet = filter.paramSets[key]
        return paramSet.paramMaps
          .map(paramMap => {
            // Process range paramMap separately
            let modifier = paramMap.languageModule.propertyAdjective
              ? `${paramMap.languageModule.propertyAdjective} `
              : ''
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
    housingTypes.map(housingType => {
      return singularPlease(housingType.name).toLowerCase() + ' properties' + convertFilterToSentence(housingType)
    }),
    'and'
  )}`
}

export const constructSentence = advancedSearch => {
  return `Show me ${[
    convertHousingTypesToSentence(advancedSearch.housingTypes),
    convertBoundariesToSentence(advancedSearch.boundaries),
  ].join(' ')} ${convertConditionMappingToSentence(advancedSearch.conditions)}`
}

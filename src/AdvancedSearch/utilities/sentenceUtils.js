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

const constructDateSentence = (dataset, startDate = null, endDate = null) => {
  return dataset.dateSentenceParser(startDate, endDate)
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

export const constructAmountSentence = (dataset, comparison, value) => {
  return dataset.amountSentenceParser(dataset, comparison, value)
}

export const convertFilterToSentence = object => {
  // converts an objects like:
  // const object = { dataset: ds, comparison: 'gte', value: '10', startDate '2017-01-01', endDate: '2018-01-01' }
  // into:
  // at least 10 HPD Violations between 01/01/2017 and 01/01/2018

  let filters = []
  let { dataset, comparison, value, startDate, endDate } = object
  filters.push(constructAmountSentence(dataset, comparison, value))
  if (startDate || endDate) {
    filters.push(constructDateSentence(dataset, startDate, endDate))
  }

  return filters.join(' ')
}

export const convertConditionGroupToSentence = conditionGroup => {
  return conditionGroup.filters
    .filter(filterObject => !filterObject.conditionGroup)
    .map(filterObject => {
      return `${convertFilterToSentence(filterObject)}`
    })
    .join(conditionGroup.type === 'AND' ? ' and ' : ' or ')
}

const constructConditionFill = conditionGroup => {
  return conditionGroup.type === 'AND' ? ' and that either have' : ' or that have'
}

export const convertConditionMappingToSentence = q => {
  const conditions = Object.keys(q)
  if (!(conditions.length && q['0'].filters.length)) return '...'
  return `have ${conditions
    .map((key, index) => {
      return `${convertConditionGroupToSentence(q[key])}${
        conditions.length > 1 && index !== conditions.length - 1 ? constructConditionFill(q[key]) : ''
      }`
    })
    .join(' ')}.`
}

export const convertBoundariesToSentence = boundaries => {
  return `in ${
    boundaries.length
      ? boundaries.map(boundary => `${boundary.name.toLowerCase()} ${boundary.id ? boundary.id : '_'}`).join(' and ')
      : '...'
  }`
}

const convertParamMapToSentence = paramMap => {
  return `${constructComparisonString(paramMap.comparison)} ${paramMap.value}`
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

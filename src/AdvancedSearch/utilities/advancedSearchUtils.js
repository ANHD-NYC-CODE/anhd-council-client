const constructAmountFilter = (dataset, comparison, value) => {
  return dataset.amountUrlParser(dataset, comparison, value)
}

const constructDateFilter = (getState, dataset, startDate = null, endDate = null) => {
  return dataset.dateUrlParser(getState, dataset, startDate, endDate)
}

export const convertFilterToParams = (getState, object) => {
  // converts an objects like:
  // const object = { dataset: ds, comparison: 'gte', value: '10', startDate '2017-01-01', endDate: '2018-01-01' }
  // into:
  // "hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10"
  let filters = []
  let { dataset, comparison, value, startDate, endDate } = object
  if (startDate || endDate) {
    filters.push(constructDateFilter(getState, dataset, startDate, endDate))
  }

  filters.push(constructAmountFilter(dataset, comparison, value))
  return filters.join(',')
}

const convertConditionGroupToString = (getState, filters) => {
  return filters
    .map((filterObject, index) => {
      const groupLabel = `filter_${index}`

      if (filterObject.conditionGroup) {
        return `${groupLabel}=condition_${filterObject.conditionGroup}`
      } else {
        return `${groupLabel}=${convertFilterToParams(getState, filterObject)}`
      }
    })
    .join(' ')
}

export const convertConditionMappingToQ = (getState, conditions) => {
  return Object.keys(conditions)
    .map(
      key =>
        `*condition_${key}=${conditions[key].type} ${convertConditionGroupToString(getState, conditions[key].filters)}`
    )
    .join(' ')
}

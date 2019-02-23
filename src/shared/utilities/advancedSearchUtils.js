const constructAmountFilter = (dataset, comparison, value) => {
  return `${dataset.model}__${dataset.amountField()}__${comparison}=${value}`
}

const constructDateFilter = (dataset, startDate = null, endDate = null) => {
  let filters = []
  if (startDate) {
    filters.push(`${dataset.model}__${dataset.dateField()}__gte=${startDate}`)
  }
  if (endDate) {
    filters.push(`${dataset.model}__${dataset.dateField()}__lte=${endDate}`)
  }

  return filters.join(',')
}

export const convertObjectToQFields = object => {
  // converts an objects like:
  // const object = { dataset: ds, comparison: 'gte', value: '10', startDate '2017-01-01', endDate: '2018-01-01' }
  // into:
  // "hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10"

  let filters = []
  let { dataset, comparison, value, startDate, endDate } = object
  if (startDate || endDate) {
    filters.push(constructDateFilter(dataset, startDate, endDate))
  }

  filters.push(constructAmountFilter(dataset, comparison, value))
  return filters.join(',')
}

const convertConditionGroupToString = (filters, groupNumber) => {
  return filters
    .map((filterObject, index) => {
      const groupLabel = `group_${groupNumber}${String.fromCharCode(97 + index)}`

      if (filterObject.conditionGroup) {
        return `${groupLabel}=*condition_${filterObject.conditionGroup}`
      } else {
        return `${groupLabel}=${convertObjectToQFields(filterObject)}`
      }
    })
    .join('+')
}

export const convertConditionMappingToQ = q => {
  return q
    .map(
      (conditionGroup, index) =>
        `condition_${index}=${conditionGroup.type}+${convertConditionGroupToString(conditionGroup.filters, index)}`
    )
    .join('+')
}

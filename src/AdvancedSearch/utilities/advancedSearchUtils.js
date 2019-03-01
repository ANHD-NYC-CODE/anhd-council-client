export const standardUrlAmountParser = (dataset, comparison, value) => {
  return `${dataset.queryName}__${dataset.amountField()}__${comparison}=${value}`
}

const constructAmountFilter = (dataset, comparison, value) => {
  return dataset.amountUrlParser(dataset, comparison, value)
}

export const standardUrlDateParser = (dataset, startDate, endDate) => {
  let filters = []
  if (startDate) {
    filters.push(`${dataset.queryName}__${dataset.dateField(startDate)}__gte=${startDate}`)
  }
  if (endDate) {
    filters.push(`${dataset.queryName}__${dataset.dateField(endDate)}__lte=${endDate}`)
  }

  return filters.join(',')
}

export const rsunitsUrlDateParser = (dataset, startDate, endDate) => {
  let filters = []
  if (startDate) {
    filters.push(`${dataset.queryName}__${dataset.dateField(startDate)}__gt=0`)
  }
  if (endDate) {
    filters.push(`${dataset.queryName}__${dataset.dateField(endDate)}__lt=0`)
  }

  return filters.join(',')
}

const constructDateFilter = (dataset, startDate = null, endDate = null) => {
  return dataset.dateUrlParser(dataset, startDate, endDate)
}

export const convertFilterToParams = object => {
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

const convertConditionGroupToString = filters => {
  return filters
    .map((filterObject, index) => {
      const groupLabel = `filter_${index}`

      if (filterObject.conditionGroup) {
        return `${groupLabel}=condition_${filterObject.conditionGroup}`
      } else {
        return `${groupLabel}=${convertFilterToParams(filterObject)}`
      }
    })
    .join(' ')
}

export const convertConditionMappingToQ = conditions => {
  return Object.keys(conditions)
    .map(key => `*condition_${key}=${conditions[key].type} ${convertConditionGroupToString(conditions[key].filters)}`)
    .join(' ')
}

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

export const convertObjectToDatasetParam = object => {
  let filters = []
  let { dataset, comparison, value, startDate, endDate } = object
  if (startDate || endDate) {
    filters.push(constructDateFilter(dataset, startDate, endDate))
  }

  filters.push(constructAmountFilter(dataset, comparison, value))
  return filters.join(',')
}

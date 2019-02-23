const cleanType = string => {
  if (string.slice(-1) == 's') return string.slice(0, -1)
  else return string
}

const constructAmountFilter = (type, comparison, value) => {
  return `${type}__count__gte=${value}`
}

const constructDateFilter = (type, startDate = null, endDate = null) => {
  let filters = []
  if (startDate) {
    filters.push(`${type}__${getDatasetDateColumn(type)}__gte=${startDate}`)
  }
  if (endDate) {
    filters.push(`${type}__${getDatasetDateColumn(type)}__lte=${endDate}`)
  }

  return filters.join(',')
}

const getDatasetDateColumn = type => {
  switch (type) {
    case 'hpdviolation':
      return 'approveddate'
      break
    default:
      return ''
  }
}

export const convertObjectToDatasetParam = object => {
  let filters = []
  let { type, comparison, value, startDate, endDate } = object
  type = cleanType(type)
  if (startDate || endDate) {
    filters.push(constructDateFilter(type, startDate, endDate))
  }

  filters.push(constructAmountFilter(type, comparison, value))
  return filters.join(',')
}

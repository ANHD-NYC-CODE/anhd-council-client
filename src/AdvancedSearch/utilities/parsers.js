import moment from 'moment'
import { constructComparisonString } from 'AdvancedSearch/utilities/sentenceUtils'

export const standardUrlAmountParser = (dataset, comparison, value) => {
  return `${dataset.queryName}__${dataset.amountField()}__${comparison}=${value}`
}

export const acrisUrlAmountParser = (dataset, comparison, value) => {
  return `${dataset.amountField()}__${comparison}=${value}`
}

export const foreclosureUrlAmountParser = (dataset, comparison, value) => {
  return `${dataset.queryName}__${dataset.amountField()}__${comparison}=${value},${dataset.queryName}__type=foreclosure`
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

export const acrisUrlDateParser = (dataset, startDate, endDate) => {
  let filters = []
  if (startDate) {
    filters.push(`${dataset.dateField(startDate)}__gte=${startDate}`)
  }
  if (endDate) {
    filters.push(`${dataset.dateField(endDate)}__lte=${endDate}`)
  }

  return filters.join(',')
}

export const standardAmountSentenceParser = (dataset, comparison, value) => {
  return `${constructComparisonString(comparison)} ${value} ${dataset.name}`
}

export const rsunitsAmountSentenceParser = (dataset, comparison, value) => {
  return `lost ${constructComparisonString(comparison)} ${value}% of their ${dataset.name}`
}

export const soldForAmountSentenceParser = (dataset, comparison, value) => {
  return `sold for ${constructComparisonString(comparison)} $${value}`
}

export const soldTimesAmountSentenceParser = (dataset, comparison, value) => {
  return `been sold ${constructComparisonString(comparison)} ${value} times`
}

export const standardDateSentenceParser = (startDate, endDate) => {
  if (startDate && endDate) {
    return `from ${moment(startDate).format('MM/DD/YYYY')} to ${moment(endDate).format('MM/DD/YYYY')}`
  } else if (startDate) {
    return `since ${moment(startDate).format('MM/DD/YYYY')}`
  } else if (endDate) {
    return `before ${moment(endDate).format('MM/DD/YYYY')}`
  }
}

export const rsunitsDateSentenceParser = (startDate, endDate) => {
  if (startDate && endDate) {
    return `from ${moment(startDate).format('YYYY')} to ${moment(endDate).format('YYYY')}`
  } else if (startDate) {
    return `since ${moment(startDate).format('YYYY')}`
  } else if (endDate) {
    return `before ${moment(endDate).format('YYYY')}`
  }
}

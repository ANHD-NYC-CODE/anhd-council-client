const constructAmountFilter = (dataset, comparison, value) => {
  return dataset.amountUrlParser(dataset, comparison, value)
}

const constructDateFilter = (datasetsConfig, dataset, startDate = null, endDate = null) => {
  return dataset.dateUrlParser(datasetsConfig, dataset, startDate, endDate)
}

export const convertDatasetFilterToParams = (datasetsConfig, filter) => {
  // converts an objects like:
  // const object = { dataset: ds, comparison: 'gte', value: '10', startDate '2017-01-01', endDate: '2018-01-01' }
  // into:
  // "hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10"
  return Object.keys(filter.paramsObject)
    .map(key => {
      return filter.paramsObject[key].paramMaps
        .map(paramMap => {
          return `${paramMap.field}__${paramMap.comparison}=${paramMap.value}`
        })
        .join(',')
    })
    .join(',')
}

const convertConditionGroupToString = (datasetsConfig, filters) => {
  return filters
    .map((filterObject, index) => {
      const groupLabel = `filter_${index}`

      if (filterObject.conditionGroup) {
        return `${groupLabel}=condition_${filterObject.conditionGroup}`
      } else {
        return `${groupLabel}=${convertDatasetFilterToParams(datasetsConfig, filterObject)}`
      }
    })
    .join(' ')
}

export const convertConditionMappingToQ = (datasetsConfig, conditions) => {
  return Object.keys(conditions)
    .map(
      key =>
        `*condition_${key}=${conditions[key].type} ${convertConditionGroupToString(
          datasetsConfig,
          conditions[key].filters
        )}`
    )
    .join(' ')
}

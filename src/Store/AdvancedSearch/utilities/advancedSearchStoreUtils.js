import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
import ParamMap from 'shared/classes/ParamMap'

export const getAdvancedSearchParamMaps = advancedSearch => {
  const conditionParamMaps = [].concat.apply(
    [],
    Object.keys(advancedSearch.conditions).map(key => advancedSearch.conditions[key].paramMaps)
  )

  const propertyParamMaps = advancedSearch.propertyFilter.paramMaps

  return [].concat.apply([], [conditionParamMaps, propertyParamMaps]).filter(p => p)
}

export const getUrlFormattedParamMaps = advancedSearch => {
  const qParamMap = new ParamMap({
    type: 'TEXT',
    field: 'q',
    value: convertConditionMappingToQ(advancedSearch.conditions),
  })

  const summaryMaps = [
    new ParamMap({
      type: 'TEXT',
      field: 'summary',
      comparison: '',
      value: true,
    }),
    new ParamMap({
      type: 'TEXT',
      field: 'summary-type',
      comparison: '',
      value: 'short-annotated',
    }),
  ]
  return [...advancedSearch.propertyFilter.paramMaps, qParamMap, ...summaryMaps].filter(p => p)
}

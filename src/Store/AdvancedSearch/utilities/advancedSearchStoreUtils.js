import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
import ParamMap from 'shared/classes/ParamMap'

export const getAdvancedSearchParamMaps = advancedSearch => {
  const conditionParamMaps = [].concat.apply(
    [],
    Object.keys(advancedSearch.conditions).map(key => advancedSearch.conditions[key].paramMaps)
  )

  const housingTypeParamMaps = [].concat.apply(
    [],
    Object.keys(advancedSearch.housingTypes).map(key => advancedSearch.housingTypes[key].paramMaps)
  )

  return [].concat.apply([], [conditionParamMaps, housingTypeParamMaps]).filter(p => p)
}

export const getUrlFormattedParamMaps = advancedSearch => {
  const qParamMap = new ParamMap({
    type: 'TEXT',
    field: 'q',
    value: convertConditionMappingToQ(advancedSearch.conditions),
  })
  return [...advancedSearch.propertyFilter.paramMaps, qParamMap].filter(p => p)
}

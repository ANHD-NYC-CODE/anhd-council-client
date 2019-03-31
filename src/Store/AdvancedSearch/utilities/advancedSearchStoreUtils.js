import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
import ParamMap from 'shared/classes/ParamMap'
export const transformStateIntoParamObject = advancedSearch => {
  return {
    ...Object.assign(
      {},
      ...advancedSearch.geographies.map(b => ({
        [b.geographyType.queryName]: b.id,
      }))
    ),
    ...Object.assign(
      {},
      ...advancedSearch.housingTypes.map(ht => ({
        housingtype: ht.queryName,
        ...Object.assign({}, ...advancedSearch.housingTypes.map(ht => ({ ...ht.params }))),
      }))
    ),
    q: convertConditionMappingToQ(advancedSearch.conditions),
  }
}

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

const constructHousingTypeParamMaps = housingTypes => {
  return housingTypes.map(ht => new ParamMap({ type: 'TEXT', field: 'housingtype', value: ht.queryName }))
}

export const getUrlFormattedParamMaps = advancedSearch => {
  let housingTypeParamMaps = constructHousingTypeParamMaps(advancedSearch.housingTypes).concat(
    [].concat.apply([], Object.keys(advancedSearch.housingTypes).map(key => advancedSearch.housingTypes[key].paramMaps))
  )

  const qParamMap = new ParamMap({
    type: 'TEXT',
    field: 'q',
    value: convertConditionMappingToQ(advancedSearch.conditions),
  })

  return [...housingTypeParamMaps, qParamMap].filter(p => p)
}

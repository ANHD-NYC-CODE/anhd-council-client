import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
export const transformStateIntoParamObject = (datasetsConfig, advancedSearch) => {
  return {
    ...Object.assign(
      {},
      ...advancedSearch.boundaries.map(b => ({
        [b.object.queryName]: b.id,
      }))
    ),
    ...Object.assign(
      {},
      ...advancedSearch.housingTypes.map(ht => ({
        housingtype: ht.queryName,
        ...Object.assign({}, ...advancedSearch.housingTypes.map(ht => ({ ...ht.params }))),
      }))
    ),
    q: convertConditionMappingToQ(datasetsConfig, advancedSearch.conditions),
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

  return [].concat.apply([], [conditionParamMaps, housingTypeParamMaps])
}

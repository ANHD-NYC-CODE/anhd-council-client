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

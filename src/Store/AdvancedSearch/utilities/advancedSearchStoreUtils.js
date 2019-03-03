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
        housingtype: ht.type,
        ...Object.assign(
          {},
          ...advancedSearch.housingTypes.map(ht =>
            Object.assign(
              {},
              ...ht.params.map(p => ({ [`${p.type}${p.comparison ? '__' + p.comparison : ''}`]: p.value }))
            )
          )
        ),
      }))
    ),
    q: convertConditionMappingToQ(datasetsConfig, advancedSearch.conditions),
  }
}

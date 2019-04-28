import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
import ParamMap from 'shared/classes/ParamMap'
import { convertFilterToSentence, convertConditionMappingToCsvFileName } from 'shared/utilities/sentenceUtils'
import { stringWithComparisonStringsToSymbol } from 'shared/utilities/languageUtils'

export const constructCsvFileName = (advancedSearch, annotated = true) => {
  let propertyFilterSentence = stringWithComparisonStringsToSymbol(
    convertFilterToSentence(advancedSearch.propertyFilter, false)
  )
    .replace(/ /g, '_')
    .replace(',', '')
  let geographySentence = advancedSearch.geographies.map(g => `${g.name}=${g.id}`).join('_')
  let conditionSentence = convertConditionMappingToCsvFileName(
    advancedSearch.conditions['0'],
    advancedSearch.conditions
  ) // TOO LONG - FILE NAMES MUST BE LESS THAN 255 CHARS!
  return [propertyFilterSentence, geographySentence, annotated ? 'custom_search' : conditionSentence]
    .join('__')
    .replace(/ /g, '_')
    .toLowerCase()
}

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

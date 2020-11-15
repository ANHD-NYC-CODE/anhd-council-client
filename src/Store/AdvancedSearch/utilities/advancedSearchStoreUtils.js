import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
import ParamMap from 'shared/classes/ParamMap'
import { convertFilterToSentence, convertConditionMappingToCsvFileName } from 'shared/utilities/sentenceUtils'
import { stringWithComparisonStringsToSymbol } from 'shared/utilities/languageUtils'
import ApiMap from 'shared/classes/ApiMap'
import * as b from 'shared/constants/geographies'

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

export const getApiMaps = advancedSearch => {
  // Don't return geography API Maps for borough geography /geography/:id/properties...
  // instead return them as params ?borough=...
  const apiMaps = []
  if (
    advancedSearch.geographies[0].constant !== b.BOROUGH_GEOGRAPHY.constant &&
    advancedSearch.geographies[0].constant !== b.CITY_GEOGRAPHY.constant
  ) {
    apiMaps.push(
      new ApiMap({ constant: advancedSearch.geographies[0].constant, resourceId: advancedSearch.geographies[0].id })
    )
  }

  apiMaps.push(new ApiMap({ constant: 'PROPERTY', name: 'Custom Search' }))
  return apiMaps
}

export const getAdvancedSearchParamMaps = advancedSearch => {
  const conditionParamMaps = [].concat.apply(
    [],
    Object.keys(advancedSearch.conditions).map(key => advancedSearch.conditions[key].paramMaps)
  )

  const propertyParamMaps = (advancedSearch.propertyFilter || {}).paramMaps

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
      value: 'custom-search',
    }),
  ]

  // Add city / borough query if that's the selected geography ?borough=...
  // If value is a * (meaning *) then don't add the param
  if (
    advancedSearch.geographies[0].constant === b.BOROUGH_GEOGRAPHY.constant &&
    advancedSearch.geographies[0].id !== '*'
  ) {
    summaryMaps.push(
      new ParamMap({
        type: 'TEXT',
        field: b.BOROUGH_GEOGRAPHY.queryName,
        comparison: '',
        value: advancedSearch.geographies[0].id,
      })
    )
  }

  return [...advancedSearch.propertyFilter.paramMaps, qParamMap, ...summaryMaps].filter(p => p)
}

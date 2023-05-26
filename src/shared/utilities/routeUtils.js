import { boroCodeToName } from 'shared/utilities/languageUtils'
import * as b from 'shared/constants/geographies'
import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'
export const resourceRouteChanged = (oldProps, newProps) => {
  return oldProps.id !== newProps.id
}

export const stringifyParamsObject = object => {
  return Object.keys(object)
    .map(key => {
      return `${key}=${object[key]}`
    })
    .join('-')
}

export const communityToCommunityProfileLink = id => {
  id = String(id)
  return `/${boroCodeToName(id.charAt(0))
    .replace(' ', '-')
    .toLowerCase()}/${id.slice(1)}`
}

export const getGeographyObject = constant => {
  return b[`${constant}_GEOGRAPHY`]
}

export const geographyToLink = (constant, id) => {
  return `/${getGeographyPath(constant)}/${id}`
}

export const getGeographyPath = constant => {
  const geographyObject = getGeographyObject(constant)
  if (!geographyObject) return ''
  return `${geographyObject.frontEndPath}`
}

export const getCustomSearchPath = (advancedSearch, geographyType, geographyId) => {
  let q = convertConditionMappingToQ(advancedSearch.conditions);
  const conditionQuery = q ? `&q=${q}` : "";
  const propertyParams = advancedSearch.propertyFilter.paramMaps.map(param => 
    `${param.field}${param.comparison === "" ? "" : "__" + param.comparison}=${param.value}`  
  ).join("&")
  const geographyTypeKey = Object.keys(b).find(gKey => b[gKey].constant === geographyType);
  return `/${b[geographyTypeKey].frontEndPath}/${geographyId}?${propertyParams}${conditionQuery}`;
}


export const addressResultToPath = ({ bbl, bin } = {}) => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('active_tab');

  if(page) {
    if (bbl && bin) {
      return `/property/${bbl}/building/${bin}?active_tab=${page}`
    } else if (bbl && !bin) {
      return `/property/${bbl}?active_tab=${page}`
    }
  } else {
    if (bbl && bin) {
      return `/property/${bbl}/building/${bin}`
    } else if (bbl && !bin) {
      return `/property/${bbl}`
    }
  }
  
}

export const isValidGeography = (config, constant, id) => {
  let configGeographies = []
  switch (constant) {
    case 'COUNCIL':
      configGeographies = config.councilDistricts
      break
    case 'COMMUNITY':
      configGeographies = config.communityDistricts
      break
    case 'STATE_ASSEMBLY':
      configGeographies = config.stateAssemblies
      break
    case 'STATE_SENATE':
      configGeographies = config.stateSenates
      break
    case 'ZIPCODE':
      configGeographies = config.zipCodes
      break
  }
  const geographyIds = configGeographies.map(geography => String(geography.id))
  return geographyIds.includes(String(id))
}

import { boroCodeToName } from 'shared/utilities/languageUtils'
import * as b from 'shared/constants/geographies'

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
  return `/${boroCodeToName(id.charAt(0))
    .replace(' ', '-')
    .toLowerCase()}/${id.slice(1)}`
}

export const getGeographyObject = constant => {
  return b[`${constant}_GEOGRAPHY`]
}

export const geographyToLink = (constant, id) => {
  return `/${getGeographyObject(constant)}/${id}`
}

export const getGeographyPath = constant => {
  const geographyObject = getGeographyObject(constant)
  if (!geographyObject) return ''
  return `${geographyObject.frontEndPath}`
}

export const addressResultToPath = ({ bbl, bin } = {}) => {
  if (bbl && bin) {
    return `/property/${bbl}/building/${bin}`
  } else if (bbl && !bin) {
    return `/property/${bbl}`
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

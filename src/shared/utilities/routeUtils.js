import { boroCodeToName } from 'shared/utilities/languageUtils'
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

export const geographyToLink = (constant, id) => {
  switch (constant) {
    case 'COUNCIL':
      return `/council/${id}`
    case 'COMMUNITY':
      return `/community/${id}`
  }
}

export const getGeographyPath = type => {
  type = type.toUpperCase()
  switch (type) {
    case 'COUNCIL':
      return 'council'
    case 'COMMUNITY':
      return 'community'
    case 'CD':
      return 'community'
  }
}

export const pathToGeographyConstant = type => {
  type = type.toUpperCase()
  switch (type) {
    case 'COUNCIL':
      return 'COUNCIL'
    case 'COMMUNITY':
      return 'COMMUNITY'
  }
}

export const addressResultToPath = ({ bbl, bin } = {}) => {
  if (bbl && bin) {
    return `/property/${bbl}/building/${bin}`
  } else if (bbl && !bin) {
    return `/property/${bbl}`
  }
}

export const isValidGeography = (type, id) => {
  switch (type) {
    case 'map':
      return true
    case 'COUNCIL':
      return id >= 1 && id <= 51
    case 'COMMUNITY':
      return [
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        164,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        210,
        211,
        212,
        226,
        227,
        228,
        301,
        302,
        303,
        304,
        305,
        306,
        307,
        308,
        309,
        310,
        311,
        312,
        313,
        314,
        315,
        316,
        317,
        318,
        355,
        356,
        401,
        402,
        403,
        404,
        405,
        406,
        407,
        408,
        409,
        410,
        411,
        412,
        413,
        414,
        480,
        481,
        482,
        483,
        484,
        501,
        502,
        503,
        595,
      ].includes(parseInt(id))
    default:
      return false
  }
}

import { boroCodeToName } from 'shared/utilities/languageUtils'
export const resourceRouteChanged = (oldProps, newProps) => {
  return oldProps.id !== newProps.id
}

export const communityToCommunityProfileLink = id => {
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

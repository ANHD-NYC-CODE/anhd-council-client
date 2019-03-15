export const resourceRouteChanged = (oldProps, newProps) => {
  return oldProps.id !== newProps.id
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

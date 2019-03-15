export const resourceRouteChanged = (oldProps, newProps) => {
  return oldProps.id !== newProps.id
}

export const getGeographyPath = type => {
  type = type.toUpperCase()
  switch (type) {
    case 'COUNCIL':
      return 'district'
    case 'COMMUNITY':
      return 'board'
    case 'CD':
      return 'board'
  }
}

export const pathToGeography = type => {
  type = type.toUpperCase()
  switch (type) {
    case 'DISTRICT':
      return 'COUNCIL'
    case 'BOARD':
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

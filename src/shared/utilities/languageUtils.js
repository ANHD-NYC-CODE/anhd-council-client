export const capitalizeWords = string => {
  return string
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

export const grammaticalList = (array, conjunction = 'and') => {
  let lastItem
  let sentence
  if (array.length === 2) {
    sentence = array.join(` ${conjunction} `)
  } else if (array.length > 2) {
    lastItem = array.pop()
    sentence = array.join(', ')
  } else {
    sentence = array[0]
  }
  return lastItem ? `${sentence}, ${conjunction} ${lastItem}` : sentence
}

export const singular = string => {
  if (string.charAt(string.length - 1).toLowerCase() === 's') {
    return string.slice(0, -1)
  } else {
    return string
  }
}

export const shortAmountComparisonString = (comparison, value) => {
  switch (comparison) {
    case 'gte':
      return `${value}+`
    case 'exact':
      return `${value}`
    case 'lte':
      return `${value}-`
  }
}

export const longAmountComparisonString = comparison => {
  switch (comparison) {
    case 'gte':
      return 'at least'
    case 'exact':
      return 'exactly'
    case 'lte':
      return 'at most'
  }
}

export const constructDateComparisonString = comparison => {
  switch (comparison) {
    case 'gte':
      return 'after'
    case 'start':
      return 'after'
    case 'lte':
      return 'before'
    case 'end':
      return 'before'
  }
}

export const housingTypeCodeToName = code => {
  switch (code) {
    case 'all':
      return 'All Residential'
    case 'rs':
      return 'Rent Stabilized'
    case 'rr':
      return 'Rent Regulated'
    case 'sh':
      return 'Small Homes'
    case 'mr':
      return 'Market Rate'
    case 'ph':
      return 'Public Housing'
  }
}

export const geographySelectionToString = ({ type, id } = {}) => {
  switch (type) {
    case 'COUNCIL':
      return `Council District ${String(id)}`
    case 'COMMUNITY':
      return `Community District ${communityIdToString(String(id))}`
  }
}

export const boroCodeToName = code => {
  switch (code) {
    case '1':
      return 'Manhattan'
    case '2':
      return 'Bronx'
    case '3':
      return 'Brooklyn'
    case '4':
      return 'Queens'
    case '5':
      return 'Staten Island'
    case 'MN':
      return 'Manhattan'
    case 'BX':
      return 'Bronx'
    case 'BK':
      return 'Brooklyn'
    case 'QN':
      return 'Queens'
    case 'SI':
      return 'Staten Island'
    default:
      return code
  }
}

export const constructAddressString = ({ number, street, borough, zip } = {}) => {
  return `${number ? `${number} ` : ''}${street ? `${borough ? `${street}, ` : `${street}`}` : ''}${
    borough ? `${borough} ` : ''
  }${zip ? `${zip} ` : ''}`
}

export const councilIdToString = id => {
  return `Council District ${id}`
}

export const communityIdToString = id => {
  const borough = boroCodeToName(String(id).charAt(0))
  return `${borough} ${String(id).slice(1)}`
}

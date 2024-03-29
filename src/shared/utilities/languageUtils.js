import * as c from 'shared/constants'

export const capitalizeString = string => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const capitalizeWords = string => {
  if (!string) return ''
  return preserveUppercaseTerms(
    string
      .split(' ')
      .map(word => {
        return capitalizeString(word)
      })
      .join(' ')
  )
}

export const capitalizeSentences = string => {
  if (!string) return ''
  return string.split('.').map(sentence => capitalizeString(sentence))
}

export const preserveUppercaseTerms = string => {
  return string.replace(/\bllc\b/i, 'LLC').replace(/nycha/i, 'NYCHA')
}

export const splitCamelCase = string => {
  if (!string) return ''
  return string.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export const addStringIfPresent = (primaryString, addedString) => {
  if (!primaryString) return ''
  else return `${primaryString}${addedString}`
}

export const grammaticalNoun = (noun, value) => {
  if (!noun) return ''
  if ((value > 1) && (noun !== 'HPD Complaints & Problems') && (noun !== 'HPD complaints & problems')) {
    return ` ${noun.endsWith('s') ? noun : noun + 's'}`
  }
  if ((noun === 'HPD Complaints & Problems') || (noun === 'HPD complaints & problems')) {
    if (value > 1) {
      return ' HPD complaints & problems'
    } else {
      return ' HPD complaint & problem'
    }
  }
  else {
    return ` ${noun.endsWith('s') ? noun.substring(0, noun.length - 1) : noun}`
  }
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
    return string.slice(0, -1);
  } else {
    return string;
  }
}

export const stringWithComparisonStringsToSymbol = string => {
  if (!string) return ''
  return string
    .toLowerCase()
    .replace(/at least /g, '+')
    .replace(/exactly /g, '=')
    .replace(/at most /g, '-')
}

export const shortAmountComparisonString = (comparison, value) => {
  switch (comparison) {
    case 'gte':
      return `${value}+`
    case 'exact':
      return `=${value}`
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
    case 'lt':
      return 'less than'
    case 'gt':
      return 'greater than'
  }
}

// TEST ///////////////////////////////

export const constructRangeComparisonString = (comparison, options = []) => {
  switch (comparison) {
    case 'lt':
      return 'less than'
    case 'gt':
      return 'greater than'
    default:
      return (options.find(option => option.value === comparison) || {}).label || ''
  }
}

// ///////////////////////////////

export const constructDateComparisonString = (comparison, options = []) => {
  switch (comparison) {
    case 'start':
      return 'since'
    case 'end':
      return 'before'
    default:
      return (options.find(option => option.value === comparison) || {}).label || ''
  }
}

export const expandHpdRegistrationAbbreviations = string => {
  if (!string) return
  return string
    .toLowerCase()
    .replace(/\bgen.part\b/, 'general partnership')
    .replace(/\bmgr\b/, 'manager')
    .replace(/\bindiv\b/, 'individual')
    .replace(/\bcorp\b/, 'corporation')
    .replace(/\bjoint\b/, 'joint partnership')
    .replace(/\blp\b/, 'limited partnership')
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
    case 'STATE_ASSEMBLY':
      return `State Assembly ${String(id)}`
    case 'STATE_SENATE':
      return `State Senate ${String(id)}`
    case 'ZIPCODE':
      return `Zip Code ${String(id)}`
  }
}

export const boroughAbbreviationToCode = abbreviation => {
  switch (abbreviation) {
    case 'MN':
      return '1'
    case 'BX':
      return '2'
    case 'BK':
      return '3'
    case 'QN':
      return '4'
    case 'SI':
      return '5'
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
  return `${number ? `${number} ` : ''}${street ? `${borough ? `${street}, ` : `${street}`}` : ''}${borough ? `${borough} ` : ''
    }${zip ? `${zip} ` : ''}`
}

export const councilIdToString = (id, prefix = true) => {
  return `${prefix ? 'Council District ' : ''}${id}`
}

export const communityIdToString = id => {
  const borough = boroCodeToName(String(id).charAt(0))
  return `${borough} ${String(id).slice(1)}`
}

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const mapFilterDateToLabel = token => {
  switch (token) {
    case c.DISTRICT_REQUEST_DATE_ONE:
      return 'last 30 days'
    case c.DISTRICT_REQUEST_DATE_TWO:
      return 'last year'
    case c.DISTRICT_REQUEST_DATE_THREE:
      return 'last 3 years'
  }
}

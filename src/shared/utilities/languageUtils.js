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

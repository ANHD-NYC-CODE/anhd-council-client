export const rentRegulatedProgramOptions = () => {
  const rentRegulatedPrograms = ['LIHCT', 'J-51', '421a']

  return rentRegulatedPrograms.map(program => ({ name: 'value', value: program, label: program }))
}

export const comparisonOptions = (comparisons, labels, type) => {
  if (type && !type.toUpperCase().match(/(DATE|INTEGER)/)) {
    throw 'Pass either DATE or INTEGER into comparison options'
  }

  if (!(labels && labels.length)) labels = []

  const dateLabels = {
    gte: 'Since',
    between: 'Between',
    lte: 'Before',
  }

  const integerLabels = {
    lte: 'At most',
    exact: 'Exactly',
    gte: 'At least',
  }

  let defaultLabels
  if (type && !labels.length) {
    switch (type.toUpperCase()) {
      case 'DATE':
        defaultLabels = dateLabels
        break
      case 'INTEGER':
        defaultLabels = integerLabels
        break
      default:
        defaultLabels = integerLabels
    }
  } else {
    defaultLabels = integerLabels
  }

  return comparisons.map((comparison, index) => ({
    name: 'comparison',
    value: comparison,
    label: labels[index] || defaultLabels[comparison],
  }))
}

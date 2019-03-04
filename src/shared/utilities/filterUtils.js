export const rentRegulatedProgramOptions = () => {
  const rentRegulatedPrograms = ['LIHCT', 'J-51', '421a']

  return rentRegulatedPrograms.map(program => ({ name: 'value', value: program, label: program }))
}

export const comparisonOptions = (comparisons, labels) => {
  if (!(labels && labels.length)) labels = []
  const defaultLabels = {
    lte: 'At most',
    exact: 'Exactly',
    gte: 'At least',
  }

  return comparisons.map((comparison, index) => ({
    name: 'comparison',
    value: comparison,
    label: labels[index] || defaultLabels[comparison],
  }))
}

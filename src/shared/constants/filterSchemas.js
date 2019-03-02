export const AMOUNTDATE = {
  fields: [
    {
      type: 'INTEGER',
      options: [
        { value: 'gte', label: 'At Least' },
        { value: 'exact', label: 'Exactly' },
        { value: 'lte', label: 'At Most' },
      ],
    },
    {
      type: 'DATE',
      options: [
        { value: 'range', label: 'From/To' },
        { value: 'startDate', label: 'Since' },
        { value: 'endDate', label: 'Before' },
      ],
    },
  ],
}

export const PERCENTYEAR = {
  fields: [
    {
      type: 'INTEGER',
      options: [
        { value: 'gte', label: 'At Least' },
        { value: 'exact', label: 'Exactly' },
        { value: 'lte', label: 'At Most' },
      ],
    },
    {
      type: 'YEAR',
      options: [
        { value: 'range', label: 'From/To' },
        { value: 'startDate', label: 'Since' },
        { value: 'endDate', label: 'Before' },
      ],
    },
  ],
}

export const BOUNDARYID = {
  fields: [
    {
      type: 'BOUNDARY_TYPE',
      options: [{ value: 'council', label: 'Council District' }, { value: 'cd', label: 'Community District/Board' }],
    },
    {
      type: 'BOUNDARY_ID',
      options: (type, boundaryArray) => {
        switch (type) {
          case 'council':
            return [...boundaryArray.map(d => ({ value: d.id, label: d.id }))]
          case 'cd':
            return [...boundaryArray.map(b => ({ value: b.id, label: b.id }))]
        }
      },
    },
  ],
}

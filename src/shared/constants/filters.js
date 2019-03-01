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

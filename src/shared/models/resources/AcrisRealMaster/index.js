import { ParameterMapping } from 'shared/classes/ParameterMapping'

const AcrisRealMaster = databaseObject => ({
  resourceConstant: 'ACRIS_REAL_MASTER',
  urlPath: 'acrisrealmasters',
  label: 'Property Sales',
  sentenceNoun: 'sales',
  ownResourceFilters: [
    new ParameterMapping({
      type: 'AMOUNT',
      field: 'docamount',
      comparison: 'gte',
      value: '1000000',
      valuePrefix: '$',
      paramNoun: 'sale price',
    }),
  ],
})

export default AcrisRealMaster

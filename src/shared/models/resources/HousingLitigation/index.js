import { constructCountParamSet } from 'shared/utilities/filterUtils'

const HousingLitigation = databaseObject => ({
  resourceConstant: 'HOUSING_LITIGATION',
  urlPath: 'housinglitigations',
  label: 'Repair Litigations',
  sentenceNoun: 'repair litigations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountParamSet({
          resourceModel,
          defaultAmount: 1,
        })
      },
    },
  },
})

export default HousingLitigation

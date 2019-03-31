import { constructCountParamSet } from 'shared/utilities/filterUtils'

const HPDViolation = databaseObject => ({
  resourceConstant: 'HPD_VIOLATION',
  urlPath: 'hpdviolations',
  label: 'HPD Violations',
  sentenceNoun: 'HPD violations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountParamSet({
          resourceModel,
        })
      },
    },
  },
})

export default HPDViolation

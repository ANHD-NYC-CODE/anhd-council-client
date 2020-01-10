export * from './config.js'
export * from './dates.js'

export * from './actions'
export * from './urls'
export * from './models'

export * from './elementCopy'

export * from 'Store/Dataset/constants'
export * from 'Store/Council/constants'
export * from 'Store/Community/constants'
export * from 'Store/StateAssembly/constants'
export * from 'Store/StateSenate/constants'
export * from 'Store/ZipCode/constants'

export const constructSummaryConstant = (constant, params) => {
  const { type, value, comparison, startDate, endDate } = params

  return [constant, type, comparison, value, startDate, endDate]
    .filter(el => el)
    .map(el => el.toUpperCase())
    .join('_')
}

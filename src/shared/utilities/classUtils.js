import ApiMap from 'shared/classes/ApiMap'

export const cloneInstance = classInstance => {
  return Object.assign(Object.create(Object.getPrototypeOf(classInstance)), classInstance)
}

export const getApiMap = resourceConstant => {
  switch (resourceConstant) {
    case 'ALL_TYPES':
      return new ApiMap({ name: 'All', queryName: 'all' })
    case 'RENT_STABILIZED':
      return new ApiMap({ name: 'Rent Stabilized', queryName: 'rs' })
    case 'RENT_REGULATED':
      return new ApiMap({ name: 'Rent Regulated', queryName: 'rr' })
    case 'SMALL_HOMES':
      return new ApiMap({ name: 'Small Homes', queryName: 'sh' })
    case 'MARKET_RATE':
      return new ApiMap({ name: 'Market Rate', queryName: 'mr' })
    case 'PUBLIC_HOUSING':
      return new ApiMap({ name: 'Public Housing', queryName: 'ph' })
    case 'DOB_FILED_PERMIT':
      return new ApiMap({ constant: 'DOB_FILED_PERMIT' })
    case 'LISPENDEN':
      return new ApiMap({ constant: 'LISPENDEN' })
    case 'PROPERTY_SALE_BY_AMOUNT':
      return new ApiMap({ constant: 'ACRIS_REAL_LEGAL' })
    case 'PROPERTY_SALE_BY_COUNT':
      return new ApiMap({ constant: 'ACRIS_REAL_LEGAL' })
    default:
      return new ApiMap({ constant: resourceConstant })
  }
}

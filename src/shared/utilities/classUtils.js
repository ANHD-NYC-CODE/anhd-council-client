import ApiMap from 'shared/classes/ApiMap'

export const cloneInstance = classInstance => {
  if (!classInstance) return classInstance
  if (typeof classInstance !== 'object') return classInstance
  return Object.assign(Object.create(Object.getPrototypeOf(classInstance)), classInstance)
}

export const deepCloneObject = (object = {}) => {
  if (!object) return object
  if (typeof object === 'object') {
    if (object.constructor.name === 'Object') {
      Object.keys(object).forEach(key => {
        if (Array.isArray(object[key])) {
          object[key] = object[key]
            .map(el => {
              return deepCloneObject[el]
            })
            .filter(e => e)
        } else {
          object[key] = deepCloneObject(object[key])
        }
      })
    } else if (object.constructor.name === 'Filter') {
      object = object.clone()
    } else if (object.constructor.name === 'ParamSet') {
      object = object.clone()
    } else if (object.constructor.name === 'ParamMap') {
      object = object.clone()
    }
  } else if (typeof object === 'function') {
    object
  } else {
    object = cloneInstance(object)
  }

  return object
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
    case 'FORECLOSURE':
      return new ApiMap({ constant: 'FORECLOSURE' })
    case 'OCA_HOUSING_COURT':
      return new ApiMap({ constant: 'OCA_HOUSING_COURT', queryName: 'oca-housing-court' })
    case 'PSFORECLOSURE':
      return new ApiMap({ constant: 'PSFORECLOSURE', queryName: 'foreclosure-auctions' })
    case 'PROPERTY_SALE_BY_AMOUNT':
      return new ApiMap({ constant: 'ACRIS_REAL_LEGAL' })
    case 'PROPERTY_SALE_BY_COUNT':
      return new ApiMap({ constant: 'ACRIS_REAL_LEGAL' })
    default:
      return new ApiMap({ constant: resourceConstant })
  }
}

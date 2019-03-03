import { ComparisonFilter } from 'shared/classes/ComparisonFilter'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

export const RENTSTABILZED = {
  name: 'Rent Stabilized',
  queryName: 'rs',
  constant: 'RENT_STABILIZED',
  filters: [],
  paramsMappingSchema: [],
}

export const RENTREGULATED = {
  name: 'Rent Regulated',
  queryName: 'rr',
  constant: 'RENT_REGULATED',

  paramsMappingSchema: {
    unitsres: new ParameterMapping(
      'unitsres',
      'lte',
      '6',
      new ComparisonFilter('INTEGER', 'Number of residential units', 'Add Residential Units +')
    ),
    coresubsidyrecord__programname: new ParameterMapping(
      'coresubsidyrecord__programname',
      'any',
      '',
      'Add Program Name +'
    ),
  },
}

export const SMALLHOMES = {
  name: 'Small Homes',
  queryName: 'sh',
  constant: 'SMALL_HOMES',
  filters: [],
  paramsMappingSchema: [],
}

export const MARKETRATE = {
  name: 'Market Rate',
  queryName: 'mr',
  constant: 'MARKET_RATE',
  filters: [],
  paramsMappingSchema: [],
}

export const PUBLICHOUSING = {
  name: 'Public Housing',
  queryName: 'ph',
  constant: 'PUBLIC_HOUSING',
  filters: [],
  paramsMappingSchema: [],
}

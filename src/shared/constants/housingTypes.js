import { ComparisonFilter } from 'shared/classes/ComparisonFilter'
import { TextFilter } from 'shared/classes/TextFilter'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

export const RENTSTABILZED = {
  name: 'Rent Stabilized',
  queryName: 'rs',
  constant: 'RENT_STABILIZED',
  paramsMappingSchema: {},
}

export const RENTREGULATED = {
  name: 'Rent Regulated',
  queryName: 'rr',
  constant: 'RENT_REGULATED',

  paramsMappingSchema: {
    coresubsidyrecord__programname: new ParameterMapping(
      'coresubsidyrecord__programname',
      'any',
      '',
      new TextFilter('SELECT', 'Program Name', 'Add Program +', ['LIHCT', 'J-51', '421a'])
    ),
  },
}

export const SMALLHOMES = {
  name: 'Small Homes',
  queryName: 'sh',
  constant: 'SMALL_HOMES',
  paramsMappingSchema: {
    unitsres: new ParameterMapping(
      'unitsres',
      'lte',
      '6',
      new ComparisonFilter('INTEGER', 'Number of residential units', 'Add Residential Units +')
    ),
  },
}

export const MARKETRATE = {
  name: 'Market Rate',
  queryName: 'mr',
  constant: 'MARKET_RATE',
  paramsMappingSchema: {},
}

export const PUBLICHOUSING = {
  name: 'Public Housing',
  queryName: 'ph',
  constant: 'PUBLIC_HOUSING',
  paramsMappingSchema: {},
}

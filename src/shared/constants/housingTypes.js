import { ComparisonFilter } from 'shared/classes/ComparisonFilter'

export const RENTSTABILZED = {
  name: 'Rent Stabilized',
  queryName: 'rs',
  constant: 'RENT_STABILIZED',
  filters: [],
}

export const RENTREGULATED = {
  name: 'Rent Regulated',
  queryName: 'rr',
  constant: 'RENT_REGULATED',
  filters: [new ComparisonFilter('INTEGER', 'Number of residential units', 'unitsres')],
}

export const SMALLHOMES = {
  name: 'Small Homes',
  queryName: 'sh',
  constant: 'SMALL_HOMES',
  filters: [],
}

export const MARKETRATE = {
  name: 'Market Rate',
  queryName: 'mr',
  constant: 'MARKET_RATE',
  filters: [],
}

export const PUBLICHOUSING = {
  name: 'Public Housing',
  queryName: 'ph',
  constant: 'PUBLIC_HOUSING',
  filters: [],
}

import moment from 'moment'

import { rentRegulatedProgramOptions, comparisonOptions } from 'shared/utilities/filterUtils'
import { BaseFilter } from 'shared/classes/BaseFilter'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

export const RENTSTABILZED = {
  name: 'Rent Stabilized',
  queryName: 'rs',
  constant: 'RENT_STABILIZED',
  schema: {},
}

export const RENTREGULATED = {
  name: 'Rent Regulated',
  queryName: 'rr',
  constant: 'RENT_REGULATED',

  schema: {
    coresubsidyrecord__programname: new ParameterMapSet(
      new BaseFilter('MULTISELECT', 'Program Name', 'Add Program +', rentRegulatedProgramOptions()),
      [],
      [new ParameterMapping('coresubsidyrecord__programname', 'any', '')]
    ),

    coresubsidyrecord__enddate: new ParameterMapSet(
      new BaseFilter('DATE', 'Expiration Date', 'Add Expiration +'),
      [],
      [
        new ParameterMapping(
          'coresubsidyrecord__enddate',
          'gte',
          moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD')
        ),
        new ParameterMapping(
          'coresubsidyrecord__enddate',
          'lte',
          moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD')
        ),
      ]
    ),
  },
}

export const SMALLHOMES = {
  name: 'Small Homes',
  queryName: 'sh',
  constant: 'SMALL_HOMES',
  schema: {
    unitsres: new ParameterMapSet(
      new BaseFilter(
        'INTEGER',
        'Number of residential units',
        'Add Residential Units +',
        comparisonOptions(['lte', 'exact'])
      ),
      [],
      [new ParameterMapping('unitsres', 'lte', '6')]
    ),
  },
}

export const MARKETRATE = {
  name: 'Market Rate',
  queryName: 'mr',
  constant: 'MARKET_RATE',
  schema: {},
}

export const PUBLICHOUSING = {
  name: 'Public Housing',
  queryName: 'ph',
  constant: 'PUBLIC_HOUSING',
  schema: {},
}

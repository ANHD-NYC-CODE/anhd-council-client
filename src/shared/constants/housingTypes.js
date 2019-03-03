import { ComparisonFilter } from 'shared/classes/ComparisonFilter'
import { TextFilter } from 'shared/classes/TextFilter'
import { DateFilterClass } from 'shared/classes/DateFilterClass'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'

import { ParameterMapping } from 'shared/classes/ParameterMapping'
import moment from 'moment'

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
    coresubsidyrecord__programname: new ParameterMapSet(
      new TextFilter('MULTISELECT', 'Program Name', 'Add Program +', ['LIHCT', 'J-51', '421a']),
      [new ParameterMapping('coresubsidyrecord__programname', 'any', '')],
      1
    ),

    coresubsidyrecord__enddate: new ParameterMapSet(
      new DateFilterClass('DATE', 'Expiration Date', 'Add Expiration +'),
      [
        new ParameterMapping(
          'coresubsidyrecord__enddate',
          'lte',
          moment(moment.now())
            .add(1, 'Y')
            .format('MM/DD/YYYY')
        ),
        new ParameterMapping(
          'coresubsidyrecord__enddate',
          'lte',
          moment(moment.now())
            .add(1, 'Y')
            .format('MM/DD/YYYY')
        ),
      ],
      2
    ),
  },
}

export const SMALLHOMES = {
  name: 'Small Homes',
  queryName: 'sh',
  constant: 'SMALL_HOMES',
  paramsMappingSchema: {
    unitsres: new ParameterMapSet(
      new ComparisonFilter('INTEGER', 'Number of residential units', 'Add Residential Units +'),
      [new ParameterMapping('unitsres', 'lte', '6')],
      1
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

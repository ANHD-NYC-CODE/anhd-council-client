import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { Filter } from 'shared/classes/Filter'
import { constantToQueryName } from 'shared/utilities/filterUtils'

export const createFilterMock = ({
  constant = '',
  dateFieldQuery = '',
  defaultDate = '',
  amountFieldQuery = '',
  defaultAmount = '',
} = {}) => {
  return new Filter({
    datasetConstant: constant,
    paramsObject: {
      hpdviolations: new ParameterMapSet({
        paramMaps: [
          new ParameterMapping({
            field: `${constantToQueryName(constant)}${amountFieldQuery ? '__' + amountFieldQuery : ''}`,
            comparison: 'gte',
            value: defaultAmount || '10',
          }),
          new ParameterMapping({
            field: `${constantToQueryName(constant)}${dateFieldQuery ? '__' + dateFieldQuery : ''}`,
            comparison: 'gte',
            value: defaultDate || '2017-01-01',
            rangeKey: 'hpd',
            rangePosition: 1,
          }),
          new ParameterMapping({
            field: `${constantToQueryName(constant)}${dateFieldQuery ? '__' + dateFieldQuery : ''}`,
            comparison: 'lte',
            value: defaultDate || '2018-01-01',
            rangeKey: 'hpd',
            rangePosition: 2,
          }),
        ],
      }),
    },
  })
}

export const filterMocks = {
  HPD_VIOLATION: createFilterMock({
    constant: 'HPD_VIOLATION',
    dateFieldQuery: 'approveddate',
    amountFieldQuery: 'count',
  }),
  DOB_VIOLATION: createFilterMock({
    constant: 'DOB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
  }),
  ECB_VIOLATION: createFilterMock({
    constant: 'ECB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
  }),
  HPD_COMPLAINT: createFilterMock({
    constant: 'HPD_COMPLAINT',
    dateFieldQuery: 'receiveddate',
    amountFieldQuery: 'count',
  }),
  DOB_COMPLAINT: createFilterMock({
    constant: 'DOB_COMPLAINT',
    dateFieldQuery: 'dateentered',
    amountFieldQuery: 'count',
  }),
  SALE_AMOUNT: createFilterMock({
    constant: 'ACRIS_REAL_LEGAL',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__docamount',
  }),
  SALE_COUNT: createFilterMock({
    constant: 'ACRIS_REAL_LEGAL',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__count',
    defaultAmount: '5',
  }),
}

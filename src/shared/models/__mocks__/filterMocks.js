import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { Filter } from 'shared/classes/Filter'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { constantToQueryName, constantToName } from 'shared/utilities/filterUtils'

export const createFilterMock = ({
  constant = '',
  languageConstant = '',
  dateFieldQuery = '',
  defaultDate = '',
  amountFieldQuery = '',
  defaultAmount = '',
  capitalizeDepartment = true,
  amountPropertyAdjective = undefined,
  datePropertyAdjective = undefined,
  amountValuePrefix = undefined,
  noun = undefined,
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
            languageModule: new LanguageModule({
              type: 'AMOUNT',
              noun:
                noun !== undefined
                  ? noun
                  : constantToName({
                      constant: languageConstant ? languageConstant : constant,
                      capitalizeDepartment,
                    }),
              propertyAdjective: amountPropertyAdjective,
              valuePrefix: amountValuePrefix,
            }),
          }),
          new ParameterMapping({
            field: `${constantToQueryName(constant)}${dateFieldQuery ? '__' + dateFieldQuery : ''}`,
            comparison: 'gte',
            value: defaultDate || '2017-01-01',
            rangeKey: 'hpd',
            rangePosition: 1,
            languageModule: new LanguageModule({
              type: 'DATE',
              noun:
                noun !== undefined
                  ? noun
                  : constantToName({ constant: languageConstant ? languageConstant : constant, capitalizeDepartment }),
              propertyAdjective: datePropertyAdjective,
            }),
          }),
          new ParameterMapping({
            field: `${constantToQueryName(constant)}${dateFieldQuery ? '__' + dateFieldQuery : ''}`,
            comparison: 'lte',
            value: defaultDate || '2018-01-01',
            rangeKey: 'hpd',
            rangePosition: 2,
            languageModule: new LanguageModule({
              type: 'DATE',
              noun:
                noun !== undefined
                  ? noun
                  : constantToName({ constant: languageConstant ? languageConstant : constant, capitalizeDepartment }),
              propertyAdjective: datePropertyAdjective,
            }),
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
  PROPERTY_SALE_BY_AMOUNT: createFilterMock({
    constant: 'ACRIS_REAL_LEGAL',
    languageConstant: 'PROPERTY_SALE_BY_AMOUNT',
    capitalizeDepartment: false,
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__docamount',
    amountPropertyAdjective: 'sold for',
    amountValuePrefix: '$',
    noun: '',
  }),
  PROPERTY_SALE_BY_COUNT: createFilterMock({
    constant: 'ACRIS_REAL_LEGAL',
    languageConstant: 'PROPERTY_SALE_BY_COUNT',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__count',
    capitalizeDepartment: false,
    defaultAmount: '5',
  }),
  EVICTION: createFilterMock({
    constant: 'EVICTION',
    dateFieldQuery: 'executeddate',
    amountFieldQuery: 'count',
    defaultAmount: '10',
    capitalizeDepartment: false,
  }),
}

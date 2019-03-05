import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { Filter } from 'shared/classes/Filter'

export const filterMocks = {
  hpd_violations: new Filter({
    datasetConstant: 'HPD_VIOLATIONS',
    paramsObject: {
      hpdviolations: new ParameterMapSet({
        paramMaps: [
          new ParameterMapping({
            field: 'hpdviolations__count',
            comparison: 'gte',
            value: '10',
          }),
          new ParameterMapping({
            field: 'hpdviolations__approveddate',
            comparison: 'gte',
            value: '2017-01-01',
            rangeKey: 'hpd',
            rangePosition: 1,
          }),
          new ParameterMapping({
            field: 'hpdviolations__approveddate',
            comparison: 'lte',
            value: '2018-01-01',
            rangeKey: 'hpd',
            rangePosition: 2,
          }),
        ],
      }),
    },
  }),
  dob_violations: new Filter({
    datasetConstant: 'DOB_VIOLATIONS',
    paramsObject: {
      dobviolations: new ParameterMapSet({
        paramMaps: [
          new ParameterMapping({
            field: 'dobviolations__count',
            comparison: 'gte',
            value: '10',
          }),
          new ParameterMapping({
            field: 'dobviolations__issuedate',
            comparison: 'gte',
            value: '2017-01-01',
            rangeKey: 'dob',
            rangePosition: 1,
          }),
          new ParameterMapping({
            field: 'dobviolations__issuedate',
            comparison: 'lte',
            value: '2018-01-01',
            rangeKey: 'dob',
            rangePosition: 2,
          }),
        ],
      }),
    },
  }),
  ecb_violations: new Filter({
    datasetConstant: 'ECB_VIOLATIONS',
    paramsObject: {
      ecbviolations: new ParameterMapSet({
        paramMaps: [
          new ParameterMapping({
            field: 'ecbviolations__count',
            comparison: 'gte',
            value: '10',
          }),
          new ParameterMapping({
            field: 'ecbviolations__issuedate',
            comparison: 'gte',
            value: '2017-01-01',
            rangeKey: 'ecb',
            rangePosition: 1,
          }),
          new ParameterMapping({
            field: 'ecbviolations__issuedate',
            comparison: 'lte',
            value: '2018-01-01',
            rangeKey: 'dob',
            rangePosition: 2,
          }),
        ],
      }),
    },
  }),
}

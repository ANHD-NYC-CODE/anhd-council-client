import * as f from 'shared/constants/filters'

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  queryName: 'hpdviolations',
  url: '/hpdviolations/',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '10',
    startDate: '2018-01-01',
  },
}

export const DOBVIOLATIONS = {
  name: 'DOB Violations',
  queryName: 'dobviolations',
  url: '/dobviolations/',
  constant: 'DOB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '10',
    startDate: '2018-01-01',
  },
}

export const ECBVIOLATIONS = {
  name: 'ECB Violations',
  queryName: 'ecbviolations',
  url: '/ecbviolations/',
  constant: 'ECB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '10',
    startDate: '2017-01-01',
  },
}

export const HPDCOMPLAINTS = {
  name: 'HPD Complaints',
  queryName: 'hpdcomplaints',
  url: '/hpdcomplaints/',
  constant: 'HPD_COMPLAINTS',
  dateField: () => 'receiveddate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '10',
    startDate: '2017-01-01',
  },
}

export const DOBCOMPLAINTS = {
  name: 'DOB Complaints',
  queryName: 'dobcomplaints',
  url: '/dobcomplaints/',
  constant: 'DOB_COMPLAINTS',
  dateField: () => 'dateentered',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '10',
    startDate: '2017-01-01',
  },
}

export const EVICTIONS = {
  name: 'Evictions',
  queryName: 'evictions',
  url: '/evictions/',
  constant: 'EVICTIONS',
  dateField: () => 'executeddate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '1',
    startDate: '2017-01-01',
  },
}

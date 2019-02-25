import * as f from 'shared/constants/filters'

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  queryName: 'hpdviolations',
  model: 'hpdviolation',
  url: '/hpdviolations/',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
}

export const DOBVIOLATIONS = {
  name: 'DOB Violations',
  queryName: 'dobviolations',
  model: 'dobviolation',
  url: '/dobviolations/',
  constant: 'DOB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
}

export const ECBVIOLATIONS = {
  name: 'ECB Violations',
  queryName: 'ecbviolations',
  model: 'ecbviolation',
  url: '/ecbviolations/',
  constant: 'ECB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
}

export const HPDCOMPLAINTS = {
  name: 'HPD Complaints',
  queryName: 'hpdcomplaints',
  model: 'hpdcomplaint',
  url: '/hpdcomplaints/',
  constant: 'HPD_COMPLAINTS',
  dateField: () => 'receiveddate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
}

export const DOBCOMPLAINTS = {
  name: 'DOB Complaints',
  queryName: 'dobcomplaints',
  model: 'dobcomplaint',
  url: '/dobcomplaints/',
  constant: 'DOB_COMPLAINTS',
  dateField: () => 'dateentered',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
}

export const EVICTIONS = {
  name: 'Evictions',
  queryName: 'evictions',
  model: 'eviction',
  url: '/evictions/',
  constant: 'EVICTIONS',
  dateField: () => 'executeddate',
  amountField: () => 'count',
  filter: f.AMOUNTDATE,
}

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  model: 'hpdviolation',
  url: '/hpdviolations/',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
  amountField: () => 'count',
}

export const DOBVIOLATIONS = {
  name: 'DOB Violations',
  model: 'dobviolation',
  url: '/dobviolations/',
  constant: 'DOB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
}

export const ECBVIOLATIONS = {
  name: 'ECB Violations',
  model: 'ecbviolation',
  url: '/ecbviolations/',
  constant: 'ECB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
}

export const HPDCOMPLAINTS = {
  name: 'HPD Complaints',
  model: 'hpdcomplaint',
  url: '/hpdcomplaints/',
  constant: 'HPD_COMPLAINTS',
  dateField: () => 'receiveddate',
  amountField: () => 'count',
}

export const DOBCOMPLAINTS = {
  name: 'DOB Complaints',
  model: 'dobcomplaint',
  url: '/dobcomplaints/',
  constant: 'DOB_COMPLAINTS',
  dateField: () => 'dateentered',
  amountField: () => 'count',
}

export const EVICTIONS = {
  name: 'Evictions',
  model: 'eviction',
  url: '/evictions/',
  constant: 'EVICTIONS',
  dateField: () => 'executeddate',
  amountField: () => 'count',
}

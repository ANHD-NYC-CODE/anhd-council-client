export const HPDVIOLATIONS = {
  name: 'hpdviolations',
  model: 'hpdviolation',
  url: '/hpdviolations/',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
  amountField: () => 'count',
}

export const DOBVIOLATIONS = {
  name: 'dobviolations',
  model: 'dobviolation',
  url: '/dobviolations/',
  constant: 'DOB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
}

export const ECBVIOLATIONS = {
  name: 'ecbviolations',
  model: 'ecbviolation',
  url: '/ecbviolations/',
  constant: 'ECB_VIOLATIONS',
  dateField: () => 'issuedate',
  amountField: () => 'count',
}

export const HPDCOMPLAINTS = {
  name: 'hpdcomplaints',
  model: 'hpdcomplaint',
  url: '/hpdcomplaints/',
  constant: 'HPD_COMPLAINTS',
  dateField: () => 'receiveddate',
  amountField: () => 'count',
}

export const DOBCOMPLAINTS = {
  name: 'dobcomplaints',
  model: 'dobcomplaint',
  url: '/dobcomplaints/',
  constant: 'DOB_COMPLAINTS',
  dateField: () => 'dateentered',
  amountField: () => 'count',
}

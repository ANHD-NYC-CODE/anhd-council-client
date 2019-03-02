import * as f from 'shared/constants/filterSchemas'

import * as p from 'AdvancedSearch/utilities/parsers'
import moment from 'moment'

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  queryName: 'hpdviolations',
  url: '/hpdviolations/',
  model: 'hpdviolation',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
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
  model: 'dobviolation',
  constant: 'DOB_VIOLATIONS',
  dateField: () => 'issuedate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
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
  model: 'ecbviolation',
  constant: 'ECB_VIOLATIONS',
  dateField: () => 'issuedate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
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
  model: 'hpdcomplaint',
  constant: 'HPD_COMPLAINTS',
  dateField: () => 'receiveddate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
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
  model: 'dobcomplaint',
  constant: 'DOB_COMPLAINTS',
  dateField: () => 'dateentered',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
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
  model: 'eviction',
  constant: 'EVICTIONS',
  dateField: () => 'executeddate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '1',
    startDate: '2017-01-01',
  },
}

export const FORECLOSURES = {
  name: 'Foreclosures',
  queryName: 'lispendens',
  url: '/lispendens/',
  model: 'lispenden',
  constant: 'FORECLOSURES',
  dateField: () => 'fileddate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.foreclosureUrlAmountParser,
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '1',
    startDate: '2017-01-01',
  },
}

export const CONSTRUCTIONPERMITSISSUED = {
  name: 'Construction Permits Issued',
  queryName: 'dobpermitissuedjoined',
  url: '/dobpermitsissued/',
  model: 'dobpermitissuedjoined',
  constant: 'CONSTRUCTION_PERMITS_ISSUED',
  dateField: () => 'issuedate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: p.standardAmountSentenceParser,
  amountUrlParser: p.standardUrlAmountParser,
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '10',
    startDate: '2017-01-01',
  },
}

export const RENTSTABILIZEDUNITSLOST = {
  name: 'Rent Stabilized Units',
  queryName: 'rentstabilizationrecords',
  url: '/rentstabilizationrecords/',
  model: 'rentstabilizationrecord',
  constant: 'RENT_STABILIZED_UNITS_LOST',
  dateField: year => `uc${year}`,
  getMaxDate: datasetConfig => datasetConfig.version || '2018',
  dateSentenceParser: p.rsunitsDateSentenceParser,
  dateUrlParser: p.rsunitsUrlDateParser,
  amountField: () => 'percent',
  amountSentenceParser: p.rsunitsAmountSentenceParser,
  amountUrlParser: p.rsunitsUrlAmountParser,
  filter: f.PERCENTYEAR,
  defaultFilterValues: {
    comparison: 'gte',
    value: '25',
    startDate: '2017',
  },
}

export const SOLDFORAMOUNT = {
  name: 'Sold For $',
  queryName: 'acrisrealmasteramounts',
  url: '/acrisrealmasteramounts/',
  constant: 'SOLD_FOR_AMOUNT',
  model: 'acrisrealmaster',
  dateField: () => 'acrisreallegals__documentid__docdate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.acrisUrlDateParser,
  amountField: () => 'acrisreallegals__documentid__docamount',
  amountSentenceParser: p.soldForAmountSentenceParser,
  amountUrlParser: p.acrisUrlAmountParser,
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '1000000',
    startDate: '2017-01-01',
  },
}

export const SOLDTIMES = {
  name: 'Times Sold',
  queryName: 'acrisrealmasteramounts',
  url: '/acrisrealmasteramounts/',
  constant: 'SOLD_TIMES',
  model: 'acrisrealmaster',
  dateField: () => 'acrisreallegals__documentid__docdate',
  getMaxDate: () => moment().format('YYYY-MM-DD'),
  dateSentenceParser: p.standardDateSentenceParser,
  dateUrlParser: p.acrisUrlDateParser,
  amountField: () => 'acrisreallegals__documentid__count',
  amountSentenceParser: p.soldTimesAmountSentenceParser,
  amountUrlParser: p.acrisUrlAmountParser,
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '2',
    startDate: '2017-01-01',
  },
}

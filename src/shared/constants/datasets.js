import * as f from 'shared/constants/filters'

import * as p from 'AdvancedSearch/utilities/parsers'

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  queryName: 'hpdviolations',
  url: '/hpdviolations/',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
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
  constant: 'DOB_VIOLATIONS',
  dateField: () => 'issuedate',
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
  constant: 'ECB_VIOLATIONS',
  dateField: () => 'issuedate',
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
  constant: 'HPD_COMPLAINTS',
  dateField: () => 'receiveddate',
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
  constant: 'DOB_COMPLAINTS',
  dateField: () => 'dateentered',
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
  constant: 'EVICTIONS',
  dateField: () => 'executeddate',
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
  constant: 'FORECLOSURES',
  dateField: () => 'fileddate',
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
  constant: 'CONSTRUCTION_PERMITS_ISSUED',
  dateField: () => 'issuedate',
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
  constant: 'RENT_STABILIZED_UNITS_LOST',
  dateField: year => `uc${year}`,
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
  dateField: () => 'acrisreallegals__documentid__docdate',
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
  dateField: () => 'acrisreallegals__documentid__docdate',
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

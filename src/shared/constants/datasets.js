import * as f from 'shared/constants/filters'
import {
  standardDateSentenceParser,
  standardAmountSentence,
  standardUrlAmountParser,
  standardUrlDateParser,
  rsunitsDateSentenceParser,
  rsunitsAmountSentence,
  rsunitsUrlDateParser,
} from 'shared/utilities/advancedSearchUtils'

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  queryName: 'hpdviolations',
  url: '/hpdviolations/',
  constant: 'HPD_VIOLATIONS',
  dateField: () => 'approveddate',
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
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
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
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
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
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
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
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
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
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
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
  filter: f.AMOUNTDATE,
  defaultFilterValues: {
    comparison: 'gte',
    value: '1',
    startDate: '2017-01-01',
  },
}

export const CONSTRUCTIONPERMITSISSUED = {
  name: 'Construction Permits Issued',
  queryName: 'dobpermitsissued',
  url: '/dobpermitsissued/',
  constant: 'CONSTRUCTION_PERMITS_ISSUED',
  dateField: () => 'issuedate',
  dateSentenceParser: standardDateSentenceParser,
  dateUrlParser: standardUrlDateParser,
  amountField: () => 'count',
  amountSentenceParser: standardAmountSentence,
  amountUrlParser: standardUrlAmountParser,
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
  dateSentenceParser: rsunitsDateSentenceParser,
  dateUrlParser: rsunitsUrlDateParser,
  amountField: () => 'percent',
  amountSentenceParser: rsunitsAmountSentence,
  amountUrlParser: standardUrlAmountParser,
  filter: f.PERCENTYEAR,
  defaultFilterValues: {
    comparison: 'gte',
    value: '25',
    startDate: '2017',
  },
}

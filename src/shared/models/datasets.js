import { ApiMap } from 'shared/classes/ApiMap'
import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'
export const HPD_VIOLATION = {
  apiMap: new ApiMap({ constant: 'HPD_VIOLATION' }),
  schema: constructDefaultSchema({
    constant: 'HPD_VIOLATION',
    dateFieldQuery: 'approveddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HPD_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
}

export const DOB_VIOLATION = {
  apiMap: new ApiMap({ constant: 'DOB_VIOLATION' }),
  schema: constructDefaultSchema({
    constant: 'DOB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
}

export const ECB_VIOLATION = {
  apiMap: new ApiMap({ constant: 'ECB_VIOLATION' }),
  schema: constructDefaultSchema({
    constant: 'ECB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'ECB_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
}

export const HPD_COMPLAINT = {
  apiMap: new ApiMap({ constant: 'HPD_COMPLAINT' }),
  schema: constructDefaultSchema({
    constant: 'HPD_COMPLAINT',
    dateFieldQuery: 'receiveddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HPD_COMPLAINT', capitalizeDepartment: true, plural: true }),
  }),
}

export const DOB_COMPLAINT = {
  apiMap: new ApiMap({ constant: 'DOB_COMPLAINT' }),
  schema: constructDefaultSchema({
    constant: 'DOB_COMPLAINT',
    dateFieldQuery: 'dateentered',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_COMPLAINT', capitalizeDepartment: true, plural: true }),
  }),
}

export const EVICTION = {
  apiMap: new ApiMap({ constant: 'EVICTION' }),
  schema: constructDefaultSchema({
    constant: 'EVICTION',
    dateFieldQuery: 'executeddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'EVICTION', capitalizeDepartment: false, plural: true }),
  }),
}

export const PROPERTY_SALE_BY_AMOUNT = {
  apiMap: new ApiMap({ constant: 'ACRIS_REAL_LEGAL' }),
  schema: constructDefaultSchema({
    constant: 'PROPERTY_SALE_BY_AMOUNT',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__docamount',
  }),
  languageModule: new LanguageModule({
    noun: '',
    valuePrefix: '$',
    propertyAdjective: 'sold for',
  }),
}

export const PROPERTY_SALE_BY_COUNT = {
  apiMap: new ApiMap({ constant: 'ACRIS_REAL_LEGAL' }),
  schema: constructDefaultSchema({
    constant: 'PROPERTY_SALE_BY_COUNT',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__count',
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'PROPERTY_SALE_BY_COUNT', capitalizeDepartment: false, plural: false }),
  }),
}

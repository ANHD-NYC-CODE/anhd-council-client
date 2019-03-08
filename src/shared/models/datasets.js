import { ApiMap } from 'shared/classes/ApiMap'
import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import HiddenField from 'AdvancedSearch/FilterComponent/Field/HiddenField'

export const HPD_VIOLATION = {
  id: 'HPD_VIOLATION',
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
  id: 'DOB_VIOLATION',
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
  id: 'ECB_VIOLATION',
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
  id: 'HPD_COMPLAINT',
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
  id: 'DOB_COMPLAINT',
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
  id: 'EVICTION',
  apiMap: new ApiMap({ constant: 'EVICTION' }),
  schema: constructDefaultSchema({
    constant: 'EVICTION',
    dateFieldQuery: 'executeddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
    defaultAmount: 1,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'EVICTION', capitalizeDepartment: false, plural: true }),
  }),
}

export const PROPERTY_SALE_BY_AMOUNT = {
  id: 'PROPERTY_SALE_BY_AMOUNT',
  apiMap: new ApiMap({ constant: 'ACRIS_REAL_LEGAL' }),
  schema: constructDefaultSchema({
    constant: 'PROPERTY_SALE_BY_AMOUNT',
    apiField: 'acrisreallegals',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__docamount',
    amountNoun: '',
    amountValuePrefix: '$',
    defaultAmount: '1000000',
    amountPropertyAdjective: 'sold for',
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'PROPERTY_SALE_BY_AMOUNT', capitalizeDepartment: false, plural: false }),
  }),
}

export const PROPERTY_SALE_BY_COUNT = {
  id: 'PROPERTY_SALE_BY_COUNT',
  apiMap: new ApiMap({ constant: 'ACRIS_REAL_LEGAL' }),
  schema: constructDefaultSchema({
    constant: 'PROPERTY_SALE_BY_COUNT',
    apiField: 'acrisreallegals',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__count',
    amountPropertyAdjective: 'have been sold',
    defaultAmount: 2,
    amountNoun: 'times',
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'PROPERTY_SALE_BY_COUNT', capitalizeDepartment: false, plural: false }),
  }),
}

export const FORECLOSURE = {
  id: 'FORECLOSURE',
  apiMap: new ApiMap({ constant: 'LISPENDEN' }),
  schema: constructDefaultSchema({
    constant: 'FORECLOSURE',
    apiField: 'lispendens',
    dateFieldQuery: 'fileddate',
    amountFieldQuery: 'count',
    defaultAmount: '1',
    capitalizeDepartment: false,
    hiddenParamMap: new ParameterMapping({
      component: GenericFieldSet,
      baseComponent: HiddenField,
      field: 'lispendens__type',
      comparison: '',
      value: 'foreclosure',
    }),
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'FORECLOSURE', capitalizeDepartment: false, plural: true }),
  }),
}

export const DOB_ISSUED_PERMIT = {
  id: 'DOB_ISSUED_PERMIT',
  apiMap: new ApiMap({ constant: 'DOB_ISSUED_PERMIT' }),
  schema: constructDefaultSchema({
    constant: 'DOB_ISSUED_PERMIT',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
    defaultAmount: 5,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_ISSUED_PERMIT', capitalizeDepartment: true, plural: true }),
  }),
}

export const DOB_FILED_PERMIT = {
  id: 'DOB_FILED_PERMIT',
  apiMap: new ApiMap({ constant: 'DOB_FILED_PERMIT' }),
  schema: constructDefaultSchema({
    constant: 'DOB_FILED_PERMIT',
    dateFieldQuery: 'dobrundate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
    defaultAmount: 5,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_FILED_PERMIT', capitalizeDepartment: true, plural: true }),
  }),
}

export const HOUSING_LITIGATION = {
  id: 'HOUSING_LITIGATION',
  apiMap: new ApiMap({ constant: 'HOUSING_LITIGATION' }),
  schema: constructDefaultSchema({
    constant: 'HOUSING_LITIGATION',
    dateFieldQuery: 'caseopendate',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
    defaultAmount: 1,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HOUSING_LITIGATION', capitalizeDepartment: false, plural: true }),
  }),
}

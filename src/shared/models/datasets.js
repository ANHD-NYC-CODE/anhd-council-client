import { ApiMap } from 'shared/classes/ApiMap'
import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import HiddenField from 'AdvancedSearch/FilterComponent/Field/HiddenField'

export const HPD_VIOLATION = databaseObject => ({
  id: 'HPD_VIOLATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'HPD_VIOLATION',
    dateFieldQuery: 'approveddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HPD_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
})

export const DOB_VIOLATION = databaseObject => ({
  id: 'DOB_VIOLATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
})

export const ECB_VIOLATION = databaseObject => ({
  id: 'ECB_VIOLATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'ECB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'ECB_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
})

export const HPD_COMPLAINT = databaseObject => ({
  id: 'HPD_COMPLAINT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'HPD_COMPLAINT',
    dateFieldQuery: 'receiveddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HPD_COMPLAINT', capitalizeDepartment: true, plural: true }),
  }),
})

export const DOB_COMPLAINT = databaseObject => ({
  id: 'DOB_COMPLAINT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_COMPLAINT',
    dateFieldQuery: 'dateentered',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_COMPLAINT', capitalizeDepartment: true, plural: true }),
  }),
})

export const EVICTION = databaseObject => ({
  id: 'EVICTION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'EVICTION',
    dateFieldQuery: 'executeddate',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
    defaultAmount: 1,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'EVICTION', capitalizeDepartment: false, plural: true }),
  }),
})

export const PROPERTY_SALE_BY_AMOUNT = databaseObject => ({
  id: 'PROPERTY_SALE_BY_AMOUNT',
  schema: constructDefaultSchema({
    databaseObject,
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
})

export const PROPERTY_SALE_BY_COUNT = databaseObject => ({
  id: 'PROPERTY_SALE_BY_COUNT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'PROPERTY_SALE_BY_COUNT',
    apiField: 'acrisreallegals',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__count',
    amountPropertyAdjective: 'were sold',
    defaultAmount: 2,
    amountNoun: 'times',
    amountShortNoun: 'times',
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'PROPERTY_SALE_BY_COUNT', capitalizeDepartment: false, plural: false }),
  }),
})

export const FORECLOSURE = databaseObject => ({
  id: 'FORECLOSURE',
  schema: constructDefaultSchema({
    databaseObject,
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
})

export const DOB_ISSUED_PERMIT = databaseObject => ({
  id: 'DOB_ISSUED_PERMIT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_ISSUED_PERMIT',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
    defaultAmount: 5,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_ISSUED_PERMIT', capitalizeDepartment: true, plural: true }),
  }),
})

export const DOB_FILED_PERMIT = databaseObject => ({
  id: 'DOB_FILED_PERMIT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_FILED_PERMIT',
    apiField: 'doblegacyfiledpermits',
    dateFieldQuery: 'dobrundate',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
    defaultAmount: 5,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_FILED_PERMIT', capitalizeDepartment: true, plural: true }),
  }),
})

export const HOUSING_LITIGATION = databaseObject => ({
  id: 'HOUSING_LITIGATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'HOUSING_LITIGATION',
    dateFieldQuery: 'caseopendate',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
    defaultAmount: 1,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HOUSING_LITIGATION', capitalizeDepartment: false, plural: true }),
  }),
})

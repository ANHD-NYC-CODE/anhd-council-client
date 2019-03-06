import moment from 'moment'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { comparisonOptions } from 'shared/utilities/filterUtils'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { ApiMap } from 'shared/classes/ApiMap'

import MultiTypeFieldGroup from 'AdvancedSearch/Filter/Group/MultiTypeFieldGroup'
import ComparisonFieldSet from 'AdvancedSearch/Filter/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/Filter/Field/DateField'
import IntegerField from 'AdvancedSearch/Filter/Field/IntegerField'
import { constructDefaultSchema } from 'shared/utilities/filterUtils'

export const HPD_VIOLATION = {
  apiMap: new ApiMap({ constant: 'HPD_VIOLATION' }),
  schema: constructDefaultSchema({
    constant: 'HPD_VIOLATION',
    dateFieldQuery: 'approveddate',
    amountFieldQuery: 'count',
  }),
}

export const DOB_VIOLATION = {
  apiMap: new ApiMap({ constant: 'DOB_VIOLATION' }),
  schema: constructDefaultSchema({
    constant: 'DOB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
  }),
}

export const ECB_VIOLATION = {
  apiMap: new ApiMap({ constant: 'ECB_VIOLATION' }),
  schema: constructDefaultSchema({
    constant: 'ECB_VIOLATION',
    dateFieldQuery: 'issuedate',
    amountFieldQuery: 'count',
  }),
}

export const HPD_COMPLAINT = {
  apiMap: new ApiMap({ constant: 'HPD_COMPLAINT' }),
  schema: constructDefaultSchema({
    constant: 'HPD_COMPLAINT',
    dateFieldQuery: 'receiveddate',
    amountFieldQuery: 'count',
  }),
}

export const DOB_COMPLAINT = {
  apiMap: new ApiMap({ constant: 'DOB_COMPLAINT' }),
  schema: constructDefaultSchema({
    constant: 'DOB_COMPLAINT',
    dateFieldQuery: 'dateentered',
    amountFieldQuery: 'count',
  }),
}

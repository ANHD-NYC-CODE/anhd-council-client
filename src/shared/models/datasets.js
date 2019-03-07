import { ApiMap } from 'shared/classes/ApiMap'
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

export const SALE_AMOUNT = {
  apiMap: new ApiMap({ constant: 'ACRIS_REAL_LEGAL' }),
  schema: constructDefaultSchema({
    constant: 'ACRIS_REAL_LEGAL',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__docamount',
  }),
}

export const SALE_COUNT = {
  apiMap: new ApiMap({ constant: 'ACRIS_REAL_LEGAL' }),
  schema: constructDefaultSchema({
    constant: 'ACRIS_REAL_LEGAL',
    dateFieldQuery: 'documentid__docdate',
    amountFieldQuery: 'documentid__count',
  }),
}

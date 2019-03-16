import moment from 'moment'
import { textFilter } from 'react-bootstrap-table2-filter'

import {
  dateFormatter,
  bldgClassFormater,
  dobComplaintCategoryFormatter,
  dobPermitWorkTypeFormatter,
  acrisDocTypeFormatter,
  dobPermitSourceFormatter,
} from 'shared/utilities/tableUtils'

//
// const expandRowDescription = (descriptionKey = {
//   renderer: row => (
//     <div>
//       <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
//     </div>
//   ),
// }

export const getTableColumns = constant => {
  switch (constant) {
    case 'PROPERTY':
      return [
        {
          dataField: 'bbl',
          text: 'BBL',
        },
        {
          dataField: 'address',
          text: 'Address',
        },
        {
          dataField: 'bldgclass',
          text: 'Class',
          formatter: bldgClassFormater,
        },
        {
          dataField: 'yearbuilt',
          text: 'Year Built',
        },
        {
          dataField: 'unitstotal',
          text: 'Total Units',
        },
        {
          dataField: 'unitsres',
          text: 'Residential Units',
        },
        {
          dataField: 'unitsrentstabilized',
          text: 'Rent Stabilized Units',
        },
        {
          dataField: 'numbldgs',
          text: '# Buildings',
        },
        {
          dataField: 'numfloors',
          text: '# Floors',
        },
      ]
    case 'HPD_VIOLATION':
      return [
        {
          dataField: 'violationid',
          text: 'Violation ID',
        },
        {
          dataField: 'approveddate',
          text: 'Date Approved',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'class_name',
          text: 'Class',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'novdescription',
          text: 'Description',
          filter: textFilter(),
        },
        {
          dataField: 'currentstatus',
          text: 'Notice Status',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'violationstatus',
          text: 'Violation Status',
          filter: textFilter(),
          sort: true,
        },
      ]
    case 'HPD_COMPLAINT':
      return [
        {
          dataField: 'complaintid',
          text: 'Complaint ID',
        },
        {
          dataField: 'receiveddate',
          text: 'Date Received',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'apartment',
          text: 'Apt.',
        },
        {
          dataField: 'status',
          text: 'Status',
        },
      ]
    case 'DOB_VIOLATION':
      return [
        {
          dataField: 'isndobbisviol',
          text: 'isndobbisviol',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'violationtype',
          text: 'Violation Type',
        },
        {
          dataField: 'description',
          text: 'Description',
        },
        {
          dataField: 'violationcategory',
          text: 'Status',
        },
      ]
    case 'DOB_COMPLAINT':
      return [
        {
          dataField: 'complaintnumber',
          text: 'Complaint #',
        },
        {
          dataField: 'dateentered',
          text: 'Date Entered',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'complaintcategory',
          text: 'Category',
          formatter: dobComplaintCategoryFormatter,
        },
        {
          dataField: 'status',
          text: 'Status',
        },
      ]
    case 'ECB_VIOLATION':
      return [
        {
          dataField: 'ecbviolationnumber',
          text: 'Violation #',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'violationtype',
          text: 'Violation Type',
        },
        {
          dataField: 'severity',
          text: 'Severity',
        },
        {
          dataField: 'violationdescription',
          text: 'Description',
        },
        {
          dataField: 'ecbviolationstatus',
          text: 'Status',
        },
      ]
    case 'DOB_ISSUED_PERMIT':
      return [
        {
          dataField: 'jobfilingnumber',
          text: 'Job Filing #',
        },
        {
          dataField: 'workpermit',
          text: 'Work Permit',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'worktype',
          text: 'Work Type',
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
          formatter: dobPermitWorkTypeFormatter,
        },
        {
          dataField: 'type',
          text: 'Source',
          formatter: dobPermitSourceFormatter,
        },
      ]
    case 'DOB_FILED_PERMIT':
      return [
        {
          dataField: 'job',
          text: 'Job #',
        },
        {
          dataField: 'dobrundate',
          text: 'Date Run',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'jobtype',
          text: 'Job Type',
          formatter: dobPermitWorkTypeFormatter,
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
        },
        {
          dataField: 'jobstatusdescrp',
          text: 'Status',
        },
      ]
    case 'HOUSING_LITIGATION':
      return [
        {
          dataField: 'litigationid',
          text: 'Litigation ID',
        },
        {
          dataField: 'caseopendate',
          text: 'Date Open',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'casetype',
          text: 'Case Type',
        },
        {
          dataField: 'openjudgement',
          text: 'Open Judgement?',
        },
        {
          dataField: 'penalty',
          text: 'Penalty',
        },
        {
          dataField: 'casestatus',
          text: 'Status',
        },
      ]
    case 'ACRIS_REAL_MASTER':
      return [
        {
          dataField: 'documentid',
          text: 'Document ID',
        },
        {
          dataField: 'docdate',
          text: 'Date',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'doctype',
          text: 'Document Type',
          formatter: acrisDocTypeFormatter,
        },
        {
          dataField: 'docamount',
          text: 'Amount',
        },
      ]
    case 'EVICTION':
      return [
        {
          dataField: 'courtindexnumber',
          text: 'Court Index #',
        },
        {
          dataField: 'docketnumber',
          text: 'Docker #',
        },
        {
          dataField: 'executeddate',
          text: 'Date',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'evictionaddress',
          text: 'Address Description',
        },
      ]
    case 'FORECLOSURE':
      return [
        {
          dataField: 'key',
          text: 'Key',
        },
        {
          dataField: 'fileddate',
          text: 'Date Filed',
          formatter: dateFormatter,
          sort: true,
          // filter: dateFilter({ defaultValue: { date: new Date(2018, 0, 1), comparator: '>=' } }),
        },
        {
          dataField: 'debtor',
          text: 'Debtor',
        },
      ]
    default:
      return [{ dataField: 'id', text: 'ID' }]
  }
}

export const getKeyField = constant => {
  switch (constant) {
    case 'PROPERTY':
      return 'bbl'
    case 'BUILDING':
      return 'bin'
    case 'HPD_VIOLATION':
      return 'violationid'
    case 'HPD_COMPLAINT':
      return 'complaintid'
    case 'DOB_VIOLATION':
      return 'isndobbisviol'
    case 'DOB_COMPLAINT':
      return 'complaintnumber'
    case 'ECB_VIOLATION':
      return 'ecbviolationnumber'
    case 'DOB_ISSUED_PERMIT':
      return 'jobfilingnumber'
    case 'DOB_FILED_PERMIT':
      return 'job'
    case 'HOUSING_LITIGATION':
      return 'litigationid'
    case 'ACRIS_REAL_MASTER':
      return 'documentid'
    case 'EVICTION':
      return 'courtindexnumber'
    case 'FORECLOSURE':
      return 'key'
    default:
      return 'id'
  }
}

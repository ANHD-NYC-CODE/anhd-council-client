import { textFilter } from 'react-bootstrap-table2-filter'

import {
  dateFormatter,
  bldgClassFormater,
  dobComplaintCategoryFormatter,
  dobPermitWorkTypeFormatter,
  acrisDocTypeFormatter,
  dobPermitSourceFormatter,
} from 'shared/utilities/tableUtils'

export const getDescriptionKey = constant => {
  switch (constant) {
    case 'PROPERTY':
      return 'bldgclass'
    case 'HPD_VIOLATION':
      return 'novdescription'
    case 'DOB_VIOLATION':
      return 'description'
    case 'DOB_COMPLAINT':
      return 'complaintcategory'
    case 'ECB_VIOLATION':
      return 'violationdescription'
    case 'DOB_ISSUED_PERMIT':
      return 'jobdescription'
    case 'DOB_FILED_PERMIT':
      return 'jobdescription'
  }
}

export const getTableColumns = (constant, columnExpandFunction) => {
  let columns
  switch (constant) {
    case 'PROPERTY':
      columns = [
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
      break
    case 'HPD_VIOLATION':
      columns = [
        {
          dataField: 'violationid',
          text: 'Violation ID',
        },
        {
          dataField: 'approveddate',
          text: 'Date Approved',
          formatter: dateFormatter,
          sort: true,
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
          classes: 'table-column--description',
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
      break
    case 'HPD_COMPLAINT':
      columns = [
        {
          dataField: 'complaintid',
          text: 'Complaint ID',
        },
        {
          dataField: 'receiveddate',
          text: 'Date Received',
          formatter: dateFormatter,
          sort: true,
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
      break
    case 'DOB_VIOLATION':
      columns = [
        {
          dataField: 'isndobbisviol',
          text: 'isndobbisviol',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          sort: true,
        },
        {
          dataField: 'violationtype',
          text: 'Violation Type',
        },
        {
          dataField: 'description',
          text: 'Description',
          classes: 'table-column--description',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              columnExpandFunction(e.target.textContent, row, getKeyField(constant))
            },
          },
        },
        {
          dataField: 'violationcategory',
          text: 'Status',
        },
      ]
      break
    case 'DOB_COMPLAINT':
      columns = [
        {
          dataField: 'complaintnumber',
          text: 'Complaint #',
        },
        {
          dataField: 'dateentered',
          text: 'Date Entered',
          formatter: dateFormatter,
          sort: true,
        },
        {
          dataField: 'complaintcategory',
          text: 'Category',
          formatter: dobComplaintCategoryFormatter,
          classes: 'table-column--description',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              columnExpandFunction(e.target.textContent, row, getKeyField(constant))
            },
          },
        },
        {
          dataField: 'status',
          text: 'Status',
        },
      ]
      break
    case 'ECB_VIOLATION':
      columns = [
        {
          dataField: 'ecbviolationnumber',
          text: 'Violation #',
        },
        {
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          sort: true,
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
          classes: 'table-column--description',
        },
        {
          dataField: 'ecbviolationstatus',
          text: 'Status',
        },
      ]
      break
    case 'DOB_ISSUED_PERMIT':
      columns = [
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
        },
        {
          dataField: 'worktype',
          text: 'Work Type',
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
        },
        {
          dataField: 'type',
          text: 'Source',
          formatter: dobPermitSourceFormatter,
        },
      ]
      break
    case 'DOB_FILED_PERMIT':
      columns = [
        {
          dataField: 'job',
          text: 'Job #',
        },
        {
          dataField: 'dobrundate',
          text: 'Date Run',
          formatter: dateFormatter,
          sort: true,
        },
        {
          dataField: 'jobtype',
          text: 'Job Type',
          formatter: dobPermitWorkTypeFormatter,
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
          classes: 'table-column--description',
        },
        {
          dataField: 'jobstatusdescrp',
          text: 'Status',
        },
      ]
      break
    case 'HOUSING_LITIGATION':
      columns = [
        {
          dataField: 'litigationid',
          text: 'Litigation ID',
        },
        {
          dataField: 'caseopendate',
          text: 'Date Open',
          formatter: dateFormatter,
          sort: true,
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
      break
    case 'ACRIS_REAL_MASTER':
      columns = [
        {
          dataField: 'documentid',
          text: 'Document ID',
        },
        {
          dataField: 'docdate',
          text: 'Date',
          formatter: dateFormatter,
          sort: true,
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
      break
    case 'EVICTION':
      columns = [
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
        },
        {
          dataField: 'evictionaddress',
          text: 'Address Description',
        },
      ]
      break
    case 'FORECLOSURE':
      columns = [
        {
          dataField: 'key',
          text: 'Key',
        },
        {
          dataField: 'fileddate',
          text: 'Date Filed',
          formatter: dateFormatter,
          sort: true,
        },
        {
          dataField: 'debtor',
          text: 'Debtor',
        },
      ]
      break
    default:
      columns = [{ dataField: 'id', text: 'ID' }]
  }
  return columns.map(column => {
    column['events'] = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        columnExpandFunction(e.target.textContent, row, getKeyField(constant))
      },
      onTouchStart: (e, column, columnIndex, row, rowIndex) => {
        columnExpandFunction(e.target.textContent, row, getKeyField(constant))
      },
    }
    return column
  })
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

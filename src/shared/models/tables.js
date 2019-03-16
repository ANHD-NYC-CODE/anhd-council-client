import { textFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter'

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
          sort: true,
        },
        {
          dataField: 'address',
          text: 'Address',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'bldgclass',
          text: 'Class',
          filter: textFilter(),
          formatter: bldgClassFormater,
          sort: true,
        },
        {
          dataField: 'zonedist1',
          text: 'Zone 1',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'yearbuilt',
          text: 'Year Built',
          sort: true,
        },
        {
          dataField: 'unitstotal',
          text: 'Total Units',
          sort: true,
        },
        {
          dataField: 'unitsres',
          text: 'Residential Units',
          sort: true,
        },
        {
          dataField: 'unitsrentstabilized',
          text: 'Rent Stabilized Units',
          sort: true,
        },
        {
          dataField: 'numbldgs',
          text: '# Buildings',
          sort: true,
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
          sort: true,
        },
        {
          dataField: 'status',
          text: 'Status',
          filter: textFilter(),
          sort: true,
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'description',
          text: 'Description',
          classes: 'table-column--description',
          filter: textFilter(),
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              columnExpandFunction(e.target.textContent, row, getKeyField(constant))
            },
          },
        },
        {
          dataField: 'violationcategory',
          text: 'Status',
          filter: textFilter(),
          sort: true,
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'status',
          text: 'Status',
          filter: textFilter(),
          sort: true,
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'severity',
          text: 'Severity',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'violationdescription',
          text: 'Description',
          classes: 'table-column--description',
          filter: textFilter(),
        },
        {
          dataField: 'ecbviolationstatus',
          text: 'Status',
          filter: textFilter(),
          sort: true,
        },
      ]
      break
    case 'DOB_ISSUED_PERMIT':
      columns = [
        {
          dataField: 'key',
          text: 'Key',
          hidden: true,
        },
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'type',
          text: 'Source',
          formatter: dobPermitSourceFormatter,
          sort: true,
        },
      ]
      break
    case 'DOB_FILED_PERMIT':
      columns = [
        {
          dataField: 'id',
          text: 'ID',
          hidden: true,
        },
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'jobdescription',
          text: 'Description',
          classes: 'table-column--description',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'jobstatusdescrp',
          text: 'Status',
          filter: textFilter(),
          sort: true,
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'openjudgement',
          text: 'Open Judgement?',
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'penalty',
          text: 'Penalty',
          sort: true,
        },
        {
          dataField: 'casestatus',
          text: 'Status',
          filter: textFilter(),
          sort: true,
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
          filter: textFilter(),
          sort: true,
        },
        {
          dataField: 'docamount',
          text: 'Amount',
          sort: true,
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
          filter: textFilter(),
          sort: true,
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
          filter: textFilter(),
          sort: true,
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
      return 'key'
    case 'DOB_FILED_PERMIT':
      return 'id'
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

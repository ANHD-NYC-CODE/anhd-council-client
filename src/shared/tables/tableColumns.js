import React from 'react'
import * as c from 'shared/constants'
import { textFilter } from 'react-bootstrap-table2-filter'
import ExpandedLinkRow from 'shared/components/BaseTable/ExpandedLinkRow'
import { push } from 'connected-react-router'
import { addressResultToPath } from 'shared/utilities/routeUtils'
import BaseTable from 'shared/components/BaseTable'

import {
  dateFormatter,
  hpdProblemStatusFormatter,
  annotatedColumnFormatter,
  dobComplaintCategoryPriorityFormatter,
  sentencesFormatter,
  dobComplaintCategoryDescriptionFormatter,
  dobViolationTypeFormatter,
  dobPermitWorkTypeFormatter,
  acrisDocTypeFormatter,
  acrisParties1Formatter,
  acrisParties2Formatter,
  linkWithDocumentFormatter,
  dollarFormatter,
  dobPermitSourceFormatter,
  dobPermitTypeFormatter,
  dobPermitSubtypeFormatter,
  linkFormatter,
  hpdStatusFormatter,
  lispendenCleanupFormatter,
  lispendenCommentFormatter,
  dobViolationStatusFormatter,
  capitalizeFormatter,
} from 'shared/utilities/tableUtils'

import { setAppState } from 'Store/AppState/actions'

export const getKeyField = constant => {
  switch (constant) {
    case 'PROPERTY':
      return 'bbl'
    case 'BUILDING':
      return 'bin'
    case 'RENT_STABILIZATION_RECORD':
      return 'ucbbl'
    case 'HPD_REGISTRATION':
      return 'registrationid'
    case 'HPD_CONTACT':
      return 'registrationcontactid'
    case 'HPD_VIOLATION':
      return 'violationid'
    case 'HPD_COMPLAINT':
      return 'problemid'
    case 'HPD_PROBLEM':
      return 'problemid'
    case 'DOB_VIOLATION':
      return 'isndobbisviol'
    case 'DOB_COMPLAINT':
      return 'complaintnumber'
    case 'ECB_VIOLATION':
      return 'ecbviolationnumber'
    case 'DOB_ISSUED_PERMIT':
      return 'key'
    case 'DOB_FILED_PERMIT':
      return 'key'
    case 'HOUSING_LITIGATION':
      return 'litigationid'
    case 'ACRIS_REAL_MASTER':
      return 'documentid'
    case 'ACRIS_REAL_PARTY':
      return 'key'
    case 'EVICTION':
      return 'courtindexnumber'
    case 'LISPENDEN':
      return 'key'
    case 'FORECLOSURE':
      return 'key'
    case 'PSFORECLOSURE':
      return 'key'
    default:
      return 'id'
  }
}

export const getLinkId = constant => {
  switch (constant) {
    case 'PROPERTY':
      return 'bbl'
    case 'DOB_VIOLATION':
      return 'isndobbisviol'
    case 'ECB_VIOLATION':
      return 'ecbviolationnumber'
    case 'DOB_COMPLAINT':
      return 'complaintnumber'
    case 'DOB_ISSUED_PERMIT':
      return 'jobfilingnumber'
    case 'DOB_FILED_PERMIT':
      return 'jobfilingnumber'
    case 'ACRIS_REAL_MASTER':
      return 'documentid'
    default:
      return 'id'
  }
}

export const getLinkProps = constant => {
  switch (constant) {
    case 'PROPERTY':
      return ({ linkId } = {}) => ({ href: `/property/${linkId}`, linkText: 'View Property' })
    case 'HPD_VIOLATION':
      return () => ({ href: 'https://www1.nyc.gov/site/hpd/about/hpdonline.page', linkText: 'Search HPD Online' })
    case 'HPD_COMPLAINT':
      return () => ({ href: 'https://www1.nyc.gov/site/hpd/about/hpdonline.page', linkText: 'Search HPD Online' })
    case 'HOUSING_LITIGATION':
      return () => ({ href: 'https://www1.nyc.gov/site/hpd/about/hpdonline.page', linkText: 'Search HPD Online' })
    case 'DOB_VIOLATION':
      return ({ linkId, bin }) => ({
        href: `http://a810-bisweb.nyc.gov/bisweb/ActionViolationDisplayServlet?requestid=2&allbin=${bin}&allinquirytype=BXS3OCV4&allboroughname=&allstrt=&allnumbhous=&allisn=${linkId.padStart(
          10,
          '0'
        )}&ppremise60=080410B282913`,
        linkText: linkId,
      })
    case 'ECB_VIOLATION':
      return ({ linkId }) => ({
        href: `http://a810-bisweb.nyc.gov/bisweb/ECBQueryByNumberServlet?ecbin=${linkId}&go7=+GO+&requestid=0`,
        linkText: linkId,
      })
    case 'DOB_COMPLAINT':
      return ({ linkId }) => ({
        href: `http://a810-bisweb.nyc.gov/bisweb/OverviewForComplaintServlet?complaintno=${linkId}&go6=+GO+&requestid=0`,
        linkText: linkId,
      })
    case 'DOB_ISSUED_PERMIT':
      return ({ linkId, type }) => ({
        href:
          type && type.toLowerCase().match(/legacy/)
            ? `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${linkId}&passdocnumber=&go10=+GO+&requestid=0`
            : 'https://a810-dobnow.nyc.gov/publish/#!/',
        linkText: linkId,
      })
    case 'DOB_FILED_PERMIT':
      return ({ linkId, type }) => ({
        href:
          type && type.toLowerCase().match(/legacy/)
            ? `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${linkId}&passdocnumber=&go10=+GO+&requestid=0`
            : 'https://a810-dobnow.nyc.gov/publish/#!/',
        linkText: linkId,
      })
    case 'ACRIS_REAL_MASTER':
      return ({ linkId }) => ({
        href: `https://a836-acris.nyc.gov/DS/DocumentSearch/DocumentDetail?doc_id=${linkId}`,
        linkText: linkId,
      })
    case 'ACRIS_REAL_MASTER_SCANNED':
      return ({ linkId }) => ({
        href: `https://a836-acris.nyc.gov/DS/DocumentSearch/DocumentImageView?doc_id=${linkId}`,
        linkText: linkId,
      })
    default:
      return () => null
  }
}

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

export const getTableColumns = ({
  page = undefined, // what page is this table on? "DASHBOARD" | "SEARCH"
  constant,
  columnExpandFunction,
  linkPropsFunction = () => null,
  constructFilter,
  baseTableConfig,
  dispatch,
  rowExample,
  annotationStart = c.DISTRICT_REQUEST_DATE_ONE,
  advancedSearchDatasets = [],
} = {}) => {
  let columns
  const getAnnotatedDataField = ({ annotationKey = '', rowExample = undefined } = {}) => {
    if (!rowExample) return ''
    const columnKey = Object.keys(rowExample).find(key => key.match(annotationKey))

    return columnKey
  }

  const getAnnotatedLabel = ({ annotationLabel = '', annotationKey = '', rowExample = undefined } = {}) => {
    if (!rowExample) return ''
    const columnKey = Object.keys(rowExample).find(key => key.match(annotationKey))
    if (!columnKey) return ''
    const startDate = columnKey.split('__')[1].split('-')[0]
    const endDate = columnKey.split('__')[1].split('-')[1]

    return `${annotationLabel} (${startDate} - ${endDate})`
  }

  const handleColumnEvent = ({ e, row, component, dataKey, tableConfig } = {}) => {
    const rowKey = getKeyField(constant)

    columnExpandFunction({
      component,
      expandedRowProps: {
        records: row[dataKey],
        tableConfig,
        content: e.target.textContent,
        ...linkPropsFunction({ linkId: row[getLinkId(constant)], bin: row.bin }),
      },
      rowId: row[rowKey],
      e,
    })
  }

  const linkToColumnEvent = ({ row } = {}) => {
    // Lets property rows be clickable and link to their lookup page
    if (page === 'DASHBOARD') {
      dispatch(setAppState({ linkLookupBackToDashboard: true }))
    } else {
      dispatch(setAppState({ linkLookupBackToDashboard: false }))
    }
    dispatch(push(addressResultToPath({ bbl: row.bbl })))
  }

  const expandColumnEvent = ({ e, column, row, component } = {}) => {
    if (e.target.closest('table').classList.contains('no-expand')) return e
    handleColumnEvent({ e, column, row, component })
  }

  const expandNestedColumnEvent = ({ e, column, row, component, dataKey, tableConfig } = {}) => {
    if (e.target.closest('table').classList.contains('no-expand')) return e
    handleColumnEvent({ e, column, row, component, dataKey, tableConfig })
  }

  const constructPropertyColumn = ({
    dataField,
    text,
    sort = true,
    filter,
    classes,
    formatter,
    hidden,
    csvExport,
    csvFormatter,
    columnEvent,
  }) => {
    if (!dataField) return null
    return {
      dataField,
      text,
      sort,
      filter,
      classes,
      formatter,
      hidden,
      csvExport,
      csvFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          if (columnEvent) return columnEvent({ row })
        },
      },
    }
  }

  const constructStandardColumn = ({
    key,
    dataField,
    text,
    sort = true,
    filter,
    classes,
    headerClasses,
    formatter,
    hidden,
    csvExport,
    csvFormatter,
    component = ExpandedLinkRow,
    columnEvent,
    headerSortingClasses = 'base-table__sorting-header',
  }) => {
    return {
      key,
      dataField,
      text,
      sort,
      filter,
      classes,
      headerClasses,
      formatter,
      hidden,
      csvExport,
      csvFormatter,
      headerSortingClasses,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          if (columnEvent) return columnEvent({ e, column, row, component })
        },
      },
    }
  }

  const constructNestedTableColumn = ({
    dataField,
    text,
    sort,
    filter,
    classes,
    formatter,
    hidden,
    csvExport,
    csvFormatter,
    component = BaseTable,
    dataKey,
    tableConfig,
    columnEvent,
  }) => {
    return {
      dataField,
      text,
      sort,
      filter,
      classes,
      formatter,
      hidden,
      csvExport,
      csvFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          if (columnEvent) return columnEvent({ e, column, row, component, dataKey, tableConfig })
        },
      },
    }
  }

  const getAnnotationKey = (datasetKey, annotationStart = undefined, advancedSearchDatasets = []) => {
    if (
      advancedSearchDatasets.length &&
      advancedSearchDatasets.some(constantDateKey => constantDateKey.includes(datasetKey))
    ) {
      return `${datasetKey}`
    } else if (annotationStart) {
      return `${datasetKey}_${annotationStart}`
    } else {
      return `${datasetKey}`
    }
  }

  switch (constant) {
    case 'PROPERTY':
      columns = [
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'bbl',
          text: 'BBL',
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'address',
          text: 'Address',
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'zipcode',
          text: 'Zip Code',
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'yearbuilt',
          text: 'Year Built',
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'unitstotal',
          text: 'Total Units',
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'unitsres',
          text: 'Residential Units',
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'unitsrentstabilized',
          text: 'Rent Stabilized Units',
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: 'latestsaleprice',
          text: 'Latest sale price',
          formatter: dollarFormatter,
          csvFormatter: annotatedColumnFormatter,
          sort: true,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('acrisrealmasters', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'Sales',
            rowExample,
            annotationKey: getAnnotationKey('acrisrealmasters', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('evictions', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'Marshal Evictions',
            rowExample,
            annotationKey: getAnnotationKey('evictions', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),

        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('foreclosures', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'Foreclosures',
            rowExample,
            annotationKey: getAnnotationKey('foreclosures', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('hpdcomplaints', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'HPD Complaints',
            rowExample,
            annotationKey: getAnnotationKey('hpdcomplaints', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('hpdviolations', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'HPD Violations',
            rowExample,
            annotationKey: getAnnotationKey('hpdviolations', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('dobcomplaints', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'DOB Complaints',
            rowExample,
            annotationKey: getAnnotationKey('dobcomplaints', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('dobviolations', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'DOB Violations',
            rowExample,
            annotationKey: getAnnotationKey('dobviolations', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('ecbviolations', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'ECB Violations',
            rowExample,
            annotationKey: getAnnotationKey('ecbviolations', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('dobfiledpermits', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'DOB Permit Applications',
            rowExample,
            annotationKey: getAnnotationKey('dobfiledpermits', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('dobissuedpermits', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'DOB Permit Issuances',
            rowExample,
            annotationKey: getAnnotationKey('dobissuedpermits', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
        constructPropertyColumn({
          columnEvent: linkToColumnEvent,
          dataField: getAnnotatedDataField({
            annotationKey: getAnnotationKey('housinglitigations', annotationStart, advancedSearchDatasets),
            rowExample,
          }),
          text: getAnnotatedLabel({
            annotationLabel: 'Litigations against landlords',
            rowExample,
            annotationKey: getAnnotationKey('housinglitigations', annotationStart, advancedSearchDatasets),
          }),
          sort: true,
          formatter: annotatedColumnFormatter,
          csvFormatter: annotatedColumnFormatter,
        }),
      ].filter(c => c)
      break
    case 'HPD_REGISTRATION':
      columns = [
        // constructStandardColumn({
        //   columnEvent: expandColumnEvent,
        // classes: 'expandable-cell',
        //   dataField: 'registrationid',
        //   text: 'ID',
        //   hidden: true,
        // }),
        // constructStandardColumn({
        //   columnEvent: expandColumnEvent,
        // cla1sses: 'expandable-cell',
        //   dataField: 'lastregistrationdate',
        //   text: 'Last Registration Date',
        //   formatter: dateFormatter,
        //   csvFormatter: dateFormatter,
        //   sort: true,
        // }),
        // constructStandardColumn({
        //   dataField: 'lastregistrationdate',
        //   text: 'Last Registration Date',
        // }),
        // constructNestedTableColumn({
        //   columnEvent: expandNestedColumnEvent,
        //   dataField: 'contacts',
        //   text: 'View Contacts',
        //   formatter: expandTableFormatter,
        //   dataKey: 'contacts',
        //   classes: 'nested-table-column',
        //   tableConfig: new TableConfig({ resourceConstant: 'HPD_CONTACT' }),
        // }),
      ]
      break
    case 'RENT_STABILIZATION_RECORD':
      columns = [
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'ucbbl',
          text: 'ID',
          hidden: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2007',
          text: '2007',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2008',
          text: '2008',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2009',
          text: '2009',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2010',
          text: '2010',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2011',
          text: '2011',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2012',
          text: '2012',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2013',
          text: '2013',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2014',
          text: '2014',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2015',
          text: '2015',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2016',
          text: '2016',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2017',
          text: '2017',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2018',
          text: '2018',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2019',
          text: '2019',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2020',
          text: '2020',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2021',
          text: '2021',
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'uc2022',
          text: '2022',
        }),
      ]
      break
    case 'HPD_VIOLATION':
      columns = [
        constructStandardColumn({
          dataField: 'violationid',
          text: 'Violation ID',
        }),
        constructStandardColumn({
          dataField: 'approveddate',
          text: 'Date Approved',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'apartment',
          text: 'Apartment',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'story',
          text: 'Floor',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'class_name',
          text: 'Class',
          filter: baseTableConfig.filterPrototypes['HPD_VIOLATION_CLASS'],
          headerClasses: 'hide-filter',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'novdescription',
          text: 'Description',
          filter: constructFilter(textFilter),
          classes: 'expandable-cell table-column--description',
        }),
        constructStandardColumn({
          dataField: 'violationstatus',
          text: 'Violation Status',
          filter: baseTableConfig.filterPrototypes['HPD_VIOLATION_OPEN'],
          headerClasses: 'hide-filter',
          formatter: hpdStatusFormatter,
          sort: true,
        }),
      ]
      break
    case 'HPD_CONTACT':
      columns = [
        constructStandardColumn({
          dataField: 'type',
          text: 'Type',
        }),
        constructStandardColumn({
          dataField: 'title',
          text: 'Title',
        }),

        constructStandardColumn({
          dataField: 'firstname',
          text: 'First Name',
        }),
        constructStandardColumn({
          dataField: 'lastname',
          text: 'Last Name',
        }),
        constructStandardColumn({
          dataField: 'corporationname',
          text: 'Corp Name',
        }),
        constructStandardColumn({
          dataField: 'businesshousenumber',
          text: 'Address No.',
        }),
        constructStandardColumn({
          dataField: 'businessstreetname',
          text: 'Street',
        }),
        constructStandardColumn({
          dataField: 'businessapartment',
          text: 'Apt.',
        }),
        constructStandardColumn({
          dataField: 'businesscity',
          text: 'City',
        }),
        constructStandardColumn({
          dataField: 'businessstate',
          text: 'State',
        }),
        constructStandardColumn({
          dataField: 'businesszip',
          text: 'Zip',
        }),
      ]
      break
    case 'HPD_COMPLAINT':
      columns = [
        constructStandardColumn({
          dataField: 'complaintid',
          text: 'Complaint ID',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'receiveddate',
          text: 'Date Received',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'apartment',
          text: 'Apt.',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'status',
          text: 'Status',
          filter: baseTableConfig.filterPrototypes['HPD_COMPLAINT_OPEN'],
          headerClasses: 'hide-filter',
          sort: true,
          formatter: hpdStatusFormatter,
        }),
        constructStandardColumn({
          dataField: 'type',
          text: 'Urgency',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'spacetype',
          text: 'Space Type',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'majorcategory',
          text: 'Major Category',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'minorcategory',
          text: 'Minor Category',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'code',
          text: 'Descriptor',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'statusdescription',
          text: 'Status Description',
          formatter: hpdProblemStatusFormatter,
          csvFormatter: hpdProblemStatusFormatter,
          classes: 'expandable-cell table-column--description',
          sort: true,
        }),
        // constructNestedTableColumn({
        //   columnEvent: expandNestedColumnEvent,
        //   dataField: 'hpdproblems',
        //   text: 'View Problems',
        //   formatter: expandTableFormatter,
        //   dataKey: 'hpdproblems',
        //   classes: 'nested-table-column',
        //   tableConfig: new TableConfig({ resourceConstant: 'HPD_PROBLEM' }),
        // }),
      ]
      break
    case 'HPD_PROBLEM':
      columns = [
        constructStandardColumn({
          dataField: 'problemid',
          text: 'Problem ID',
        }),
        constructStandardColumn({
          dataField: 'type',
          text: 'Urgency',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'unittype',
          text: 'Unit Type',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'spacetype',
          text: 'Space Type',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'majorcategory',
          text: 'Major Category',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'minorcategory',
          text: 'Minor Category',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'code',
          text: 'Descriptor',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'statusdescription',
          text: 'Full Description',
          filter: constructFilter(textFilter),
          sort: true,
        }),
      ]
      break
    case 'DOB_VIOLATION':
      columns = [
        constructStandardColumn({
          dataField: 'isndobbisviol',
          text: 'Violation #',
          formatter: (cell, row, index) => linkFormatter(cell, row, index, 'DOB_VIOLATION', 'isndobbisviol'),
          csvExport: false,
        }),
        constructStandardColumn({
          dataField: 'isndobbisviol',
          text: 'Violation #',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'violationtype',
          formatter: dobViolationTypeFormatter,
          csvFormatter: dateFormatter,
          text: 'Violation Type',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'description',
          text: 'Description',
          filter: constructFilter(textFilter),
          formatter: sentencesFormatter,
          csvFormatter: sentencesFormatter,
          classes: 'expandable-cell table-column--description',
        }),
        constructStandardColumn({
          dataField: 'violationcategory',
          text: 'Status',
          filter: baseTableConfig.filterPrototypes['DOB_VIOLATION_ACTIVE'],
          headerClasses: 'hide-filter',
          formatter: dobViolationStatusFormatter,
          sort: true,
        }),
      ]
      break
    case 'DOB_COMPLAINT':
      columns = [
        constructStandardColumn({
          dataField: 'complaintnumber',
          text: 'Complaint #',
          formatter: (cell, row, index) => linkFormatter(cell, row, index, 'DOB_COMPLAINT', 'complaintnumber'),
          csvExport: false,
        }),
        constructStandardColumn({
          dataField: 'complaintnumber',
          text: 'Complaint #',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'dateentered',
          text: 'Date Entered',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'complaintcategory',
          text: 'Category',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'complaintcategory',
          text: 'Priority',
          formatter: dobComplaintCategoryPriorityFormatter,
          csvFormatter: dobComplaintCategoryPriorityFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'complaintdescription',
          text: 'Description',
          // formatting occurs in ResourceModel#tabletableResultsConstructor
          // formatter: dobComplaintCategoryDescriptionFormatter,
          // csvFormatter: dobComplaintCategoryDescriptionFormatter,
          classes: 'expandable-cell table-column--description',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'status',
          text: 'Status',
          formatter: capitalizeFormatter,
          csvFormatter: capitalizeFormatter,
          filter: baseTableConfig.filterPrototypes['DOB_COMPLAINT_ACTIVE'],
          headerClasses: 'hide-filter',
          sort: true,
        }),
      ]
      break
    case 'ECB_VIOLATION':
      columns = [
        constructStandardColumn({
          dataField: 'ecbviolationnumber',
          text: 'Violation #',
          formatter: (cell, row, index) => linkFormatter(cell, row, index, 'ECB_VIOLATION', 'ecbviolationnumber'),
          csvExport: false,
        }),
        constructStandardColumn({
          dataField: 'ecbviolationnumber',
          text: 'Violation #',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'violationtype',
          text: 'Violation Type',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'severity',
          text: 'Severity',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'penalityimposed',
          text: 'Penalty Imposed',
          formatter: dollarFormatter,
          csvFormatter: dollarFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'amountpaid',
          text: 'Amount Paid',
          formatter: dollarFormatter,
          csvFormatter: dollarFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'sectionlawdescription1',
          text: 'Standard Description',
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'violationdescription',
          text: 'Violation Description',
          filter: constructFilter(textFilter),
          classes: 'expandable-cell table-column--description',
        }),
        constructStandardColumn({
          dataField: 'ecbviolationstatus',
          text: 'Status',
          filter: baseTableConfig.filterPrototypes['ECB_VIOLATION_ACTIVE'],
          headerClasses: 'hide-filter',
          sort: true,
          formatter: capitalizeFormatter,
          csvFormatter: capitalizeFormatter,
        }),
        constructStandardColumn({
          dataField: 'aggravatedlevel',
          text: 'Aggravated Level',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'hearingstatus',
          text: 'Hearing Status',
          sort: true,
        }),
      ]
      break
    case 'DOB_ISSUED_PERMIT':
      columns = [
        constructStandardColumn({
          dataField: 'id',
          text: 'Job #',
          formatter: (cell, row, index) => linkFormatter(cell, row, index, 'DOB_ISSUED_PERMIT', 'jobfilingnumber'),
          csvExport: false,
        }),
        constructStandardColumn({
          dataField: 'key',
          text: 'Key',
          csvExport: false,
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'jobfilingnumber',
          text: 'Job Filing #',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'workpermit',
          text: 'Work Permit',
        }),
        constructStandardColumn({
          dataField: 'issuedate',
          text: 'Date Issued',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'worktype',
          text: 'Work Type',
          formatter: dobPermitWorkTypeFormatter,
          csvFormatter: dobPermitWorkTypeFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'jobdescription',
          text: 'Description',
          filter: baseTableConfig.filterPrototypes['DOB_ISSUED_PERMIT_TYPE'],
          headerClasses: 'hide-filter',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'permit_type',
          text: 'Permit Type',
          formatter: dobPermitTypeFormatter,
          csvFormatter: dobPermitTypeFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'permit_subtype',
          text: 'Permit Subtype',
          formatter: dobPermitSubtypeFormatter,
          csvFormatter: dobPermitSubtypeFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'filing_status',
          text: 'Filing Status',
          sort: true,
          formatter: capitalizeFormatter,
          csvFormatter: capitalizeFormatter,
        }),
        constructStandardColumn({
          dataField: 'type',
          text: 'Source',
          formatter: dobPermitSourceFormatter,
          csvFormatter: dobPermitSourceFormatter,
          sort: true,
        }),
      ]
      break
    case 'DOB_FILED_PERMIT':
      columns = [
        constructStandardColumn({
          dataField: 'id',
          text: 'Job Filing #',
          formatter: (cell, row, index) => linkFormatter(cell, row, index, 'DOB_FILED_PERMIT', 'jobfilingnumber'),
          csvExport: false,
        }),
        constructStandardColumn({
          dataField: 'key',
          text: 'KEY',
          csvExport: false,
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'jobfilingnumber',
          text: 'Job Filing #',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'datefiled',
          text: 'Date Filed',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'jobtype',
          text: 'Job Type',
          filter: baseTableConfig.filterPrototypes['DOB_FILED_PERMIT_TYPE'],
          headerClasses: 'hide-filter',
          sort: true,
          // formatter: dobPermitWorkTypeFormatter,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'jobdescription',
          text: 'Description',
          classes: 'expandable-cell table-column--description',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'jobstatus',
          text: 'Status',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'type',
          text: 'Source',
          formatter: dobPermitSourceFormatter,
          csvFormatter: dobPermitSourceFormatter,
          sort: true,
        }),
      ]
      break
    case 'HOUSING_LITIGATION':
      columns = [
        constructStandardColumn({
          dataField: 'litigationid',
          text: 'Litigation ID',
        }),
        constructStandardColumn({
          dataField: 'caseopendate',
          text: 'Date Open',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'casetype',
          text: 'Case Type',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'respondent',
          text: 'Respondent',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'openjudgement',
          text: 'Open Judgement?',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'penalty',
          text: 'Penalty',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'casestatus',
          text: 'Status',
          sort: true,
          formatter: capitalizeFormatter,
          csvFormatter: capitalizeFormatter,
        }),
      ]
      break
    case 'ACRIS_REAL_MASTER':
      columns = [
        constructStandardColumn({
          dataField: 'documentid',
          text: 'Document ID',
          formatter: (cell, row, index) =>
            linkWithDocumentFormatter(cell, row, index, 'ACRIS_REAL_MASTER', 'documentid'),
          csvExport: false,
        }),
        constructStandardColumn({
          dataField: 'documentid',
          text: 'documentid',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'docdate',
          text: 'Document Date',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'recordedfiled',
          text: 'Filing Date',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'doctype',
          text: 'Document Type',
          formatter: acrisDocTypeFormatter,
          csvFormatter: acrisDocTypeFormatter,
          sort: true,
          filter: baseTableConfig.filterPrototypes['ACRIS_REAL_MASTER_DOCUMENT_TYPE'],
          headerClasses: 'hide-filter',
        }),
        constructStandardColumn({
          dataField: 'docamount',
          text: 'Amount',
          formatter: dollarFormatter,
          csvFormatter: annotatedColumnFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'partiesFrom',
          text: 'Parties-1 (From)',
          formatter: acrisParties1Formatter,
          csvFormatter: acrisParties1Formatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'partiesTo',
          text: 'Parties-2 (To)',
          formatter: acrisParties2Formatter,
          csvFormatter: acrisParties2Formatter,
          sort: true,
        }),
        // constructNestedTableColumn({
        //   csvExport: false,
        //   columnEvent: expandNestedColumnEvent,
        //   dataField: 'acrisrealparties',
        //   text: 'View Parties',
        //   formatter: expandTableFormatter,
        //   dataKey: 'acrisrealparties',
        //   classes: 'nested-table-column',
        //   tableConfig: new TableConfig({ resourceConstant: 'ACRIS_REAL_PARTY' }),
        // }),
      ]
      break
    case 'ACRIS_REAL_PARTY':
      columns = [
        constructStandardColumn({
          dataField: 'key',
          text: 'Key',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'documentid',
          text: 'Document ID',
        }),
        constructStandardColumn({
          dataField: 'partytype',
          text: 'Party Type',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'name',
          text: 'Name',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'address1',
          text: 'Address 1',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'address2',
          text: 'Address 2',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'city',
          text: 'City',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'state',
          text: 'State',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'zip',
          text: 'Zip',
          filter: constructFilter(textFilter),
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'country',
          text: 'Country',
          filter: constructFilter(textFilter),
          sort: true,
        }),
      ]
      break
    case 'EVICTION':
      columns = [
        constructStandardColumn({
          dataField: 'courtindexnumber',
          text: 'Court Index #',
        }),
        constructStandardColumn({
          dataField: 'docketnumber',
          text: 'Docket #',
        }),
        constructStandardColumn({
          dataField: 'executeddate',
          text: 'Date',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'evictionaddress',
          text: 'Address',
          sort: true,
        }),
      ]
      break
    case 'LISPENDEN':
      columns = [
        constructStandardColumn({
          dataField: 'key',
          text: 'Key',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'fileddate',
          text: 'Date Filed',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'cr',
          text: 'Creditor',
          formatter: lispendenCleanupFormatter,
          csvFormatter: lispendenCleanupFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'debtor',
          text: 'Debtor',
          formatter: lispendenCleanupFormatter,
          csvFormatter: lispendenCleanupFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'comments',
          text: 'Comments',
          formatter: lispendenCommentFormatter,
          csvFormatter: lispendenCommentFormatter,
          // sort: true,
        }),
      ]
      break
    case 'FORECLOSURE':
      columns = [
        constructStandardColumn({
          dataField: 'key',
          text: 'Key',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'index',
          text: 'Index #',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'date_added',
          text: 'Date Added',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'creditor',
          text: 'Creditor',
          sort: true,
          formatter: lispendenCleanupFormatter,
          csvFormatter: lispendenCleanupFormatter,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell',
          dataField: 'debtor',
          text: 'Debtor',
          sort: true,
          formatter: lispendenCleanupFormatter,
          csvFormatter: lispendenCleanupFormatter,
        }),
        constructStandardColumn({
          dataField: 'document_type',
          text: 'Document Type',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'lien_type',
          text: 'Lien Type',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'mortgage_date',
          text: 'Mortgage Date',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'mortgage_amount',
          text: 'Mortgage Amount',
          formatter: dollarFormatter,
          csvFormatter: annotatedColumnFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'source',
          text: 'Source',
          sort: true,
        }),
      ]
      break
    case 'PSFORECLOSURE':
      columns = [
        constructStandardColumn({
          dataField: 'key',
          text: 'key',
          hidden: true,
        }),
        constructStandardColumn({
          dataField: 'indexno',
          text: 'Index No.',
          hidden: false,
        }),
        constructStandardColumn({
          dataField: 'judgement',
          text: 'Judgement Date',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'dateadded',
          text: 'Date Added',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'foreclosuretype',
          text: 'Foreclosure Type',
          sort: true,
        }),
        constructStandardColumn({
          dataField: 'lien',
          text: 'Lien Amount',
          formatter: dollarFormatter,
          csvFormatter: annotatedColumnFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'plaintiff',
          text: 'Plaintiff (Creditor)',
          sort: true,
          classes: 'expandable-cell table-column--description',
        }),
        constructStandardColumn({
          dataField: 'defendant',
          text: 'Defendant (Debtor)',
          sort: true,
          columnEvent: expandColumnEvent,
          classes: 'expandable-cell table-column--description',
        }),
        constructStandardColumn({
          dataField: 'auction',
          text: 'Auction Date',
          formatter: dateFormatter,
          csvFormatter: dateFormatter,
          sort: true,
        }),
        constructStandardColumn({
          columnEvent: expandColumnEvent,
          dataField: 'auctionlocation',
          text: 'Auction Location',
          sort: true,
          classes: 'expandable-cell table-column--description',
        }),
      ]
      break
    default:
      columns = [{ dataField: 'id', text: 'ID' }]
  }

  return columns
}

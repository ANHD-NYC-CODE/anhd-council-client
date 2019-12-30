import React from 'react'
import PropTypes from 'prop-types'

import CsvButton from 'shared/components/buttons/CsvButton'
import { SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator'
import { CSVExport } from 'react-bootstrap-table2-toolkit'

import './style.scss'

const BaseTableHeader = props => {
  const getTableSize = (paginationProps, recordsSize = undefined) => {
    const getDefaultSize = () => {
      const totalSize = recordsSize || paginationProps.totalSize
      return paginationProps.dataSize === paginationProps.totalSize
        ? paginationProps.totalSize
        : `${paginationProps.dataSize}/${totalSize}`
    }

    switch (props.resourceConstant) {
      case 'HPD_COMPLAINT': {
        return (
          <span className="text-left">
            <div>Total Complaints: {String(recordsSize)}</div>
            <div>
              Total Problems:{' '}
              {paginationProps.dataSize === paginationProps.totalSize
                ? paginationProps.totalSize
                : `${paginationProps.dataSize}/${paginationProps.totalSize}`}
            </div>
          </span>
        )
      }

      case 'DOB_ISSUED_PERMIT': {
        const totalInitial = props.request.resourceModel.tableRecordsCountFunction(props.records)
        return (
          <span className="text-left">
            <div>Total initial: {totalInitial}</div>
            <div>Total renewed: {recordsSize - totalInitial}</div>
          </span>
        )
      }

      default:
        return <span>Total: {getDefaultSize()}</span>
    }
  }

  return (
    <div className="base-table-header">
      <div className="text-right d-flex justify-content-start align-items-center">
        {getTableSize(props.paginationProps, props.recordsSize)}
      </div>
      <div className="base-table-header__right-group">
        <div className="table-header__share-column">
          <CsvButton
            parentComponent={this}
            onClick={props.handleCsvClick}
            ExportCSVButton={CSVExport.ExportCSVButton}
            csvProps={props.csvProps}
            size="sm"
          />
        </div>
        {props.recordsSize > 10 && (
          <div className="table-header__pagination_dropdown">
            <SizePerPageDropdownStandalone btnContextual="btn-dark btn-sm" {...props.paginationProps} />
          </div>
        )}
      </div>
    </div>
  )
}

BaseTableHeader.propTypes = {
  csvProps: PropTypes.object,
  paginationProps: PropTypes.object,
  recordsSize: PropTypes.number,
  handleCsvClick: PropTypes.func,
  resourceConstant: PropTypes.string,
  records: PropTypes.array,
  request: PropTypes.object,
}
BaseTableHeader.defaultProps = {
  csvProps: {},
  records: [],
}

export default BaseTableHeader

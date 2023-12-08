import React from 'react'
import PropTypes from 'prop-types'

import CsvButton from 'shared/components/buttons/CsvButton'
import { SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator'
import { CSVExport } from 'react-bootstrap-table2-toolkit'
import classnames from 'classnames'
import './style.scss'

const BaseTableHeader = props => {

  const getTableSize = (paginationProps, recordsSize = undefined) => {
    const getDefaultSize = () => {
      const totalSize = recordsSize || paginationProps.totalSize
      return paginationProps.dataSize === paginationProps.totalSize
        ? paginationProps.totalSize
        : `${paginationProps.dataSize}/${totalSize}`
    }

    //  Removing pagination as a method to count as it's no longer sufficient 
    //  Total Problems: {
    //   paginationProps.dataSize === paginationProps.totalSize ? paginationProps.totalSize
    //   : `${paginationProps.dataSize}/${paginationProps.totalSize}`
    // }


    switch (props.resourceConstant) {
      case 'HPD_COMPLAINT': {
        // Assuming props.request contains an array of records
        if (!props.records || !Array.isArray(props.records)) {
          console.error('Error: props.records is undefined or not an array');
          return <span className="text-left">Data not available</span>;
        }

        const uniqueComplaintIds = new Set(props.records.map(record => record.complaintid));
        const totalUniqueComplaints = uniqueComplaintIds.size;
        const totalProblems = props.records.length;  // Total number of problems

        return (
          <span className="text-left">
            <div>
              Total Complaints: {totalUniqueComplaints}
            </div>
            <div>
              Total Problems: {totalProblems}
            </div>

          </span>
        );
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
    <div className={classnames('base-table-header', props.headerClass)}>
      <div className="base-table-header__wrapper">
        {getTableSize(props.paginationProps, props.recordsSize)}
        <div className="base-table__select-filters">
          {props.filterButtonSets.map((set, index) => {
            return (
              <div className="base-table__select-filters__container" key={`button-set${index}`}>
                {set(props.selectedFilters)}
              </div>
            )
          })}
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
  filterButtonSets: PropTypes.array,
  selectedFilters: PropTypes.object,
}
BaseTableHeader.defaultProps = {
  csvProps: {},
  records: [],
  filterButtonSets: [],
  selectedFilters: {},
}

export default BaseTableHeader

import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'
const TableHeader = props => {
  return (
    <div className="table-header">
      <h4>{props.title}</h4>
      <DatasetInfo datasetModelName={props.datasetModelName} />
    </div>
  )
}

TableHeader.propTypes = {
  datasetModelName: PropTypes.string,
  title: PropTypes.string,
}

export default TableHeader

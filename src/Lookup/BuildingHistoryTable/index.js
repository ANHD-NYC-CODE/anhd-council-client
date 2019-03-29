import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'

import { Jumbotron } from 'react-bootstrap'

const BuildingHistoryTable = props => {
  const renderTable = () => {
    return (
      <div>
        <h5>Total: {(props.records || {}).length}</h5>
        {JSON.stringify(props.records, null, 2)}
      </div>
    )
  }
  return (
    <div className="building-history-table">
      <Jumbotron style={{ maxHeight: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <h4>{props.title}</h4>
        {props.loading && <InnerLoader />}
        {props.error && <div>{props.error.message}</div>}
        {!(props.loading || props.error) && renderTable()}
      </Jumbotron>
    </div>
  )
}

BuildingHistoryTable.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.string,
  records: PropTypes.array,
}

export default BuildingHistoryTable

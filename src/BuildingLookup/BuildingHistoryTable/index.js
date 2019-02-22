import React from 'react'
import PropTypes from 'prop-types'

import { Jumbotron } from 'react-bootstrap'

const BuildingHistoryTable = props => {
  return (
    <div className="building-history-table">
      <Jumbotron style={{ maxHeight: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <h4>{props.title}</h4>
        <h5>Total: {(props.records || {}).length}</h5>
        {JSON.stringify(props.records, null, 2)}
      </Jumbotron>
    </div>
  )
}

BuildingHistoryTable.propTypes = {
  title: PropTypes.string,
  records: PropTypes.array,
}

export default BuildingHistoryTable

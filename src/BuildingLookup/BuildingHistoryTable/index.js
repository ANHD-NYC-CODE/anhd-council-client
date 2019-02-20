import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import * as c from 'Store/Building/constants'
import { requestWithAuth } from 'shared/utilities/authUtils'

class BuildingHistoryTable extends React.Component {
  constructor(props) {
    super(props)

    this.getRecords = this.getRecords.bind(this)

    this.getRecords(props)
  }

  componentWillReceiveProps(nextProps) {
    this.getRecords(nextProps)
  }

  getRecords(props) {
    if (!(props.loading || props.records) || props.parentId !== this.props.parentId) {
      props.dispatch(requestWithAuth(props.getRecords(props.parentId)))
    }
  }

  render() {
    return (
      <div className="building-history-table">
        <Jumbotron style={{ maxHeight: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <h4>{this.props.title}</h4>
          {this.props.loading || !this.props.records ? (
            <div>Loading</div>
          ) : (
            <div>
              <h5>Total: {this.props.records.length}</h5>
              <div>{JSON.stringify(this.props.records, null, 2)}</div>
            </div>
          )}
        </Jumbotron>
      </div>
    )
  }
}

BuildingHistoryTable.propTypes = {
  getRecords: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  parentId: PropTypes.string,
  recordsKey: PropTypes.string,
  records: PropTypes.array,
  title: PropTypes.string,
}

const loadingSelector = createLoadingSelector([c.GET_BUILDING_HPD_VIOLATIONS])
const errorSelector = createErrorSelector([c.GET_BUILDING_HPD_VIOLATIONS])

const mapStateToProps = (state, props) => {
  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    records: state.building[props.recordsKey],
  }
}

export default connect(mapStateToProps)(BuildingHistoryTable)

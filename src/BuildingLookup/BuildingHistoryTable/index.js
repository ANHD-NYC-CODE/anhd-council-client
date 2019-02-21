import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { getBuildingResource } from 'Store/Building/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { resourceRouteChanged } from 'shared/utilities/routeUtils'

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
    if (!(props.loading || props.error || props.records) || resourceRouteChanged(this.props, props)) {
      props.dispatch(requestWithAuth(getBuildingResource(props.recordsConstant, props.id)))
    }
  }

  render() {
    const showTable = () => {
      if (this.props.loading) {
        return <div>Loading</div>
      } else if (this.props.error) {
        return <div className="text-error">{this.props.error.message}</div>
      } else {
        return (
          <div>
            <h5>Total: {(this.props.records || {}).length}</h5>
            <div>{JSON.stringify(this.props.records, null, 2)}</div>
          </div>
        )
      }
    }

    return (
      <div className="building-history-table">
        <Jumbotron style={{ maxHeight: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <h4>{this.props.title}</h4>
          {showTable()}
        </Jumbotron>
      </div>
    )
  }
}

BuildingHistoryTable.propTypes = {
  recordsConstant: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool,
  id: PropTypes.string,
  recordsKey: PropTypes.string,
  records: PropTypes.array,
  title: PropTypes.string,
}

const mapStateToProps = (state, props) => {
  const loadingSelector = createLoadingSelector([props.recordsConstant])
  const errorSelector = createErrorSelector([props.recordsConstant])
  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    records: state.building[props.recordsConstant.split('GET_BUILDING_')[1].toLowerCase()],
  }
}

export default connect(mapStateToProps)(BuildingHistoryTable)

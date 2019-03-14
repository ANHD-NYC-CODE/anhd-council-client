import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'Store/Council/constants'
import * as d from 'shared/constants/datasets'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { createMatchSelector } from 'connected-react-router'
import BoundarySelect from 'shared/components/BoundarySelect'

import LeafletMap from 'LeafletMap'
import { Row, Col } from 'react-bootstrap'
import { setBoundaryTypeAndIdAndRedirect } from 'Store/AppState/actions'
import { pathToBoundary } from 'shared/utilities/componentUtils'
import RecordsFetchModule from 'shared/components/RecordsFetchModule'
import { getCouncilPropertySummary } from 'Store/Council/actions'
import { constructActionKey } from 'shared/utilities/actionUtils'
import BuildingHistoryTable from 'Lookup/BuildingHistoryTable'

class AlertMap extends React.Component {
  constructor(props) {
    super(props)
    if (props.path && props.id && (!props.appState.currentBoundaryType || !props.appState.currentBoundaryId)) {
      props.dispatch(setBoundaryTypeAndIdAndRedirect(pathToBoundary(props.path), props.id))
    }
  }

  render() {
    return (
      <Row>
        <Col sm={12} md={4}>
          <LeafletMap />
          <BoundarySelect
            confirmChange={true}
            currentBoundaryType={this.props.appState.currentBoundaryType}
            currentBoundaryId={this.props.appState.currentBoundaryId}
            dispatch={this.props.dispatch}
          />
        </Col>
        <Col sm={12} md={8}>
          {!!this.props.appState.currentBoundaryType && !!this.props.appState.currentBoundaryId && (
            <div className="district-map-show">
              <RecordsFetchModule
                actionKey={constructActionKey([c.GET_COUNCIL_PROPERTIES, d.HPDVIOLATIONS.constant])}
                id={this.props.appState.currentBoundaryId}
                dataset={d.HPDVIOLATIONS}
                recordsFetch={getCouncilPropertySummary}
                reducerPath="council.districtPropertySummaries"
                render={(title, records, loading, error) => (
                  <BuildingHistoryTable title={title} records={records} loading={loading} error={error} />
                )}
                title="Properties with +10 HPD Violations Last Month"
                urlParams={{ type: d.HPDVIOLATIONS.queryName, comparison: 'gte', value: '10', startDate: '2019-01-01' }}
              />
            </div>
          )}
        </Col>
      </Row>
    )
  }
}

AlertMap.propTypes = {
  dispatch: PropTypes.func,
}

const loadingSelector = createLoadingSelector([c.GET_COUNCILS])
const errorSelector = createErrorSelector([c.GET_COUNCILS])

const mapStateToProps = state => {
  const pathMatch = state.router.location.pathname.match(/(board|district)/)
  const path = pathMatch ? pathMatch[0] : null
  const matchSelector = createMatchSelector({
    path: `/${path}/:id`,
  })
  const match = matchSelector(state)

  return {
    appState: state.appState,
    districts: state.council.districts,
    district: state.council.district,
    districtHousing: state.council.districtHousing,
    loading: loadingSelector(state),
    error: errorSelector(state),
    id: match ? match.params.id : null,
    path: path,
    router: state.router,
  }
}

export default connect(mapStateToProps)(AlertMap)

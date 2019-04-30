import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { getCurrentBuilding } from 'Lookup/utilities'
import { addressResultToPath } from 'shared/utilities/routeUtils'
import StandardizedInput from 'shared/classes/StandardizedInput'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { Badge, Form, InputGroup, Row, Col, Button } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import BaseLink from 'shared/components/BaseLink'

import './style.scss'

class BuildingSelect extends React.Component {
  constructor(props) {
    super(props)

    this.getBuildingOptions = this.getBuildingOptions.bind(this)
  }

  getBuildingOptions() {
    const empty = { value: -1, isDisabled: true, label: 'Select a building' }
    const buildings = this.props.buildings.map(building => {
      return { value: building.bin, label: `${building.house_number} ${building.stname}` }
    })
    buildings.unshift(empty)
    return buildings
  }

  render() {
    const selectedBuilding = getCurrentBuilding(this.props.buildings, this.props.bin)
    return !this.props.loading ? (
      <Form className="building-select">
        <Row className="mb-2">
          <Col xs={12} className="small">
            {this.props.buildings.length}{' '}
            {this.props.buildings.length > 1 || !this.props.buildings.length ? 'buildings' : 'building'} found on this
            tax lot.
          </Col>
          <Col xs={12} className="text-muted small">
            Select an address to filter building-specific data.
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <CustomSelect
              className="building-select__select mb-2"
              size="sm"
              onChange={e => this.props.changeLookup(this.props.bbl, new StandardizedInput(e).value)}
              options={this.getBuildingOptions()}
              value={
                this.props.bin
                  ? {
                      value: this.props.bin,
                      label: `${selectedBuilding.house_number} ${selectedBuilding.stname}`,
                    }
                  : -1
              }
            />
          </Col>
        </Row>
        <Row>
          {this.props.bin && (
            <Col>
              <BaseLink
                className="d-inline-block mb-2 w-100"
                href={`${addressResultToPath({ bbl: this.props.bbl })}`}
                onClick={() => this.props.changeLookup(this.props.bbl)}
              >
                <Button variant="secondary" size="sm" block>
                  View entire tax lot
                </Button>
              </BaseLink>
            </Col>
          )}
        </Row>
      </Form>
    ) : (
      <div className="my-4">
        <SpinnerLoader size="" />
      </div>
    )
  }
}

BuildingSelect.defaultProps = {
  buildings: [],
}

BuildingSelect.propTypes = {
  bbl: PropTypes.string,
  bin: PropTypes.string,
  dispatch: PropTypes.func,
  request: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  const loadingSelector = createLoadingSelector([ownProps.request.requestConstant])
  const errorSelector = createErrorSelector([ownProps.request.requestConstant])

  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    buildings: (state.requests[ownProps.request.requestConstant] || {}).buildings,
  }
}

export default connect(mapStateToProps)(BuildingSelect)

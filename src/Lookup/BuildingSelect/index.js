import React from 'react'
import PropTypes from 'prop-types'
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
    const buildings = this.props.propertyResult.buildings.map(building => {
      return { value: building.bin, label: `${building.house_number} ${building.stname}` }
    })
    buildings.unshift(empty)
    return buildings
  }

  render() {
    if (!Object.keys(this.props.propertyResult).length) return null
    if (this.props.propertyResult.buildings.length <= 1) return null
    const selectedBuilding = getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin)
    return !this.props.loading ? (
      <Form className="building-select">
        <Row className="mb-2">
          <Col xs={12} className="small">
            {this.props.propertyResult.buildings.length} building{' '}
            {this.props.propertyResult.buildings.length > 1 || !this.props.propertyResult.buildings.length
              ? 'records'
              : 'record'}{' '}
            found for this tax lot.
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
              onChange={e => this.props.changeLookup(this.props.bbl, new StandardizedInput(e).value, false)}
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
                onClick={() => this.props.changeLookup(this.props.bbl, null, false)}
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
  propertyResult: PropTypes.object,
}

export default BuildingSelect

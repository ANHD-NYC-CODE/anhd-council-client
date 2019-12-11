import React from 'react'
import PropTypes from 'prop-types'
import { getCurrentBuilding } from 'Lookup/utilities'
import { addressResultToPath } from 'shared/utilities/routeUtils'
import StandardizedInput from 'shared/classes/StandardizedInput'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { Badge, Form, InputGroup, Row, Col, Button } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import BaseLink from 'shared/components/BaseLink'

import classnames from 'classnames'

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
        <div className="building-select__wrapper">
          <p className="building-select__text">
            <span className="font-weight-bold">{this.props.propertyResult.buildings.length}</span>{' '}
            {this.props.propertyResult.buildings.length > 1 || !this.props.propertyResult.buildings.length
              ? ' buildings'
              : ' building'}{' '}
            found for this lot. Select another address to filter for building-specific data.
          </p>
          <div className="building-select__select-group">
            <CustomSelect
              className={classnames('building-select__select', { valued: this.props.bin })}
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
            <Button onClick={() => this.props.changeLookup(this.props.bbl, this.props.bin, false)} variant="dark">
              Go
            </Button>
          </div>
        </div>
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

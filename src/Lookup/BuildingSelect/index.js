import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addressResultToPath } from 'shared/utilities/routeUtils'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { Form } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import BaseLink from 'shared/components/BaseLink'
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
    const selectedBuilding = this.props.buildings.find(building => building.bin === this.props.bin) || {}
    return this.props.buildings.length ? (
      <Form className="building-select">
        <Form.Label>Select Building</Form.Label>
        <CustomSelect
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
        {this.props.bin && (
          <BaseLink
            href={`${addressResultToPath({ bbl: this.props.bbl })}`}
            onClick={() => this.props.changeLookup(this.props.bbl)}
            text="View Property"
          />
        )}
      </Form>
    ) : null
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
  return {
    buildings: (state.requests[ownProps.request.requestConstant] || {}).buildings,
  }
}

export default connect(mapStateToProps)(BuildingSelect)

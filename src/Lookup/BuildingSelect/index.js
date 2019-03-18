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
    this.handleChange = this.handleChange.bind(this)
  }

  getBuildingOptions() {
    const empty = { value: -1, isDisabled: true, label: 'Select a building' }
    const buildings = this.props.buildings.map(building => {
      return { value: building.bin, label: `${building.house_number} ${building.stname}` }
    })
    buildings.unshift(empty)
    return buildings
  }

  handleChange(e) {
    e = new StandardizedInput(e)

    this.props.dispatch(setLookupAndRequestsAndRedirect({ bbl: this.props.appState.currentProperty, bin: e.value }))
  }

  handlePropertyLink(e) {
    e = new StandardizedInput(e)

    this.props.dispatch(setLookupAndRequestsAndRedirect({ bbl: e.value }))
  }

  render() {
    const selectedBuilding =
      this.props.buildings.find(building => building.bin === this.props.appState.currentBuilding) || {}
    return this.props.buildings.length ? (
      <Form className="building-select">
        <Form.Label>Select Building</Form.Label>
        <CustomSelect
          size="sm"
          onChange={this.handleChange}
          options={this.getBuildingOptions()}
          value={
            this.props.appState.currentBuilding
              ? {
                  value: this.props.appState.currentBuilding,
                  label: `${selectedBuilding.house_number} ${selectedBuilding.stname}`,
                }
              : -1
          }
        />
        {this.props.appState.currentBuilding && (
          <BaseLink
            href={`${addressResultToPath({ bbl: this.props.appState.currentProperty })}`}
            text="View Property"
          />
        )}
      </Form>
    ) : null
  }
}

BuildingSelect.defaultProps = {
  appState: {},
  buildings: [],
}

BuildingSelect.propTypes = {
  dispatch: PropTypes.func,
  request: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return {
    appState: state.appState,
    buildings: (state.requests[ownProps.request.requestConstant] || {}).buildings,
  }
}

export default connect(mapStateToProps)(BuildingSelect)

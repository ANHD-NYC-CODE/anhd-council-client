import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions, getZipCodeSelectOptions } from 'shared/components/GeographySelect/utils'
import { Form, Button } from 'react-bootstrap'
import StandardizedInput from 'shared/classes/StandardizedInput'
import LeafletMap from 'LeafletMap'
import CustomSelect from 'shared/components/CustomSelect'

import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'

import classnames from 'classnames'
import './style.scss'

class MainGeographySelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showMap: false,
    }

    this.passChangeType = this.passChangeType.bind(this)
    this.passChangeGeography = this.passChangeGeography.bind(this)
    this.handleShowMapClick = this.handleShowMapClick.bind(this)
    this.handleGeographyIdClick = this.handleGeographyIdClick.bind(this)
  }

  handleShowMapClick(e) {
    e.preventDefault()

    this.setState(prevState => {
      return {
        showMap: !prevState.showMap,
      }
    })
  }

  passChangeType(e) {
    this.props.handleChangeGeographyType(e)
    if (this.props.handleChange) this.props.handleChange(e)
  }

  passChangeGeography(e) {
    const standardE = new StandardizedInput(e)
    this.props.handleChangeGeography({ e: standardE })
    if (this.props.handleChange) this.props.handleChange(standardE)
  }

  handleGeographyIdClick(e) {
    if (e.originalEvent) {
      e.originalEvent.view.L.DomEvent.stopPropagation(e)
    } else {
      e.stopPropagation(e)
    }
    const standardE = new StandardizedInput(e)
    this.props.handleChangeGeographyId(standardE)
  }

  render() {
    return (
      <div data-test-id="geography-select" className="geography-select">
        <ConfigContext.Consumer>
          {config => (
            <div className="geography-select__wrapper">
              <div className="geography-select__center">
                <Form.Control
                  required
                  className={classnames(this.props.selectClass, {
                    valued: this.props.currentGeographyType || this.props.changingGeographyType,
                  })}
                  data-test-id="geography-select--type"
                  size={this.props.inputSize}
                  name="geographyType"
                  as="select"
                  data-key="geographyType"
                  onChange={this.passChangeType}
                  value={this.props.changingGeographyType || this.props.currentGeographyType || -1}
                  onBlur={this.props.handleBlur}
                  isInvalid={
                    ((this.props.touched || {}).geographyType || !!this.props.submitCount) &&
                    (this.props.errors || {}).geographyType
                  }
                >
                  <option disabled value={-1} key={-1}>
                    {this.props.placeholder || 'Select'}
                  </option>
                  <option value={b.COUNCIL_GEOGRAPHY.constant}>{b.COUNCIL_GEOGRAPHY.name}</option>
                  <option value={b.COMMUNITY_GEOGRAPHY.constant}>{b.COMMUNITY_GEOGRAPHY.name}</option>
                  <option value={b.STATE_ASSEMBLY_GEOGRAPHY.constant}>{b.STATE_ASSEMBLY_GEOGRAPHY.name}</option>
                  <option value={b.STATE_SENATE_GEOGRAPHY.constant}>{b.STATE_SENATE_GEOGRAPHY.name}</option>
                  <option value={b.ZIPCODE_GEOGRAPHY.constant}>{b.ZIPCODE_GEOGRAPHY.name}</option>
                </Form.Control>
                <FormError
                  show={
                    !!(
                      ((this.props.touched || {}).geographyType || !!this.props.submitCount) &&
                      (this.props.errors || {}).geographyType
                    )
                  }
                  message={(this.props.errors || {}).geographyType}
                />
                {!!(this.props.currentGeographyType || this.props.changingGeographyType) && (
                  <div className="zip-select">
                    {this.props.changingGeographyType === b.ZIPCODE_GEOGRAPHY.constant ||
                    (this.props.currentGeographyType === b.ZIPCODE_GEOGRAPHY.constant &&
                      !!this.props.currentGeographyId &&
                      !this.props.changingGeographyType) ? (
                      <CustomSelect
                        required
                        data-key="id"
                        name="geographyId"
                        data-test-id="geography-select--custom"
                        onChange={this.passChangeGeography}
                        value={
                          (this.props.changingGeographyId || this.props.currentGeographyId) > 0
                            ? {
                                value: this.props.changingGeographyId || this.props.currentGeographyId,
                                label: this.props.changingGeographyId || this.props.currentGeographyId,
                              }
                            : ''
                        }
                        options={getZipCodeSelectOptions(config.zipCodes)}
                        size={this.props.selectClass}
                        placeholder="Enter Zip Code..."
                      />
                    ) : (
                      <Form.Control
                        required
                        as="select"
                        data-key="id"
                        name="geographyId"
                        data-test-id="geography-select--id"
                        onChange={this.passChangeGeography}
                        placeholder="#"
                        className={classnames(this.props.selectClass, {
                          valued: this.props.currentGeographyId || this.props.changingGeographyId,
                        })}
                        size={this.props.inputSize}
                        value={this.props.changingGeographyId || this.props.currentGeographyId || -1}
                        onBlur={this.props.handleBlur}
                        isInvalid={
                          ((this.props.touched || {}).geographyId || !!this.props.submitCount) &&
                          (this.props.errors || {}).geographyId
                        }
                      >
                        {getGeographyIdOptions(
                          config.councilDistricts,
                          config.communityDistricts,
                          config.stateAssemblies,
                          config.stateSenates,
                          config.zipCodes,
                          this.props.changingGeographyType || this.props.currentGeographyType
                        )}
                      </Form.Control>
                    )}
                    <FormError
                      show={
                        !!(
                          ((this.props.touched || {}).geographyId || !!this.props.submitCount) &&
                          (this.props.errors || {}).geographyId
                        )
                      }
                      message={(this.props.errors || {}).geographyId}
                    />
                  </div>
                )}
                {!!this.props.changingGeographyType && !this.props.showSubmit && (
                  <Button
                    block
                    size={this.props.inputSize}
                    className="cancel-geography-change"
                    onClick={this.props.cancelChangeGeography}
                    variant="outline-dark"
                  >
                    Cancel
                  </Button>
                )}
                {this.props.showSubmit && (
                  <Button
                    block
                    size={this.props.inputSize}
                    className="submit-geography-change"
                    onClick={this.props.handleChangeGeography}
                    variant={this.props.submitButtonVariant}
                  >
                    Go
                  </Button>
                )}
              </div>
              {(!!this.props.changingGeographyType || !!this.props.currentGeographyType) && (
                <button href="#" className="text-link text-center my-2" onClick={this.handleShowMapClick}>
                  I don't know my district
                </button>
              )}
              {this.state.showMap && (
                <LeafletMap
                  councilDistricts={config.councilDistricts}
                  communityDistricts={config.communityDistricts}
                  stateAssemblies={config.stateAssemblies}
                  stateSenates={config.stateSenates}
                  zipCodes={config.zipCodes}
                  className="main-geography-select__map"
                  selectGeographyData={config.selectGeographyData}
                  currentGeographyType={this.props.changingGeographyType || this.props.currentGeographyType}
                  currentGeographyId={this.props.currentGeographyId}
                  changingGeographyType={this.props.changingGeographyType}
                  changingGeographyId={this.props.changingGeographyId}
                  handleChangeGeography={this.passChangeGeography}
                  handleChangeGeographyId={this.handleGeographyIdClick}
                />
              )}
            </div>
          )}
        </ConfigContext.Consumer>
      </div>
    )
  }
}

MainGeographySelect.defaultProps = {
  inputSize: 'lg',
  submitButtonVariant: 'primary',
}

MainGeographySelect.propTypes = {
  appState: PropTypes.object,
  cancelChangeGeography: PropTypes.func,
  config: PropTypes.object,
  changingGeographyType: PropTypes.string,
  currentGeographyType: PropTypes.string,
  currentGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dispatch: PropTypes.func,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeGeography: PropTypes.func,
  handleBlur: PropTypes.func,
  inputSize: PropTypes.string,
  submitCount: PropTypes.number,
  touched: PropTypes.object,
  placeholder: PropTypes.string,
  showSubmit: PropTypes.bool,
  submitButtonVariant: PropTypes.string,
}

export default MainGeographySelect

import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions, getZipCodeSelectOptions } from 'shared/components/GeographySelect/utils'
import { Form, Button } from 'react-bootstrap'

import StandardizedInput from 'shared/classes/StandardizedInput'
import CustomSelect from 'shared/components/CustomSelect'
import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'

import classnames from 'classnames'
import './style.scss'

class GeographySelect extends React.Component {
  constructor(props) {
    super(props)
    this.passChangeType = this.passChangeType.bind(this)
    this.passChangeGeography = this.passChangeGeography.bind(this)
  }

  passChangeType(e) {
    this.props.handleChangeGeographyType(e)
    if (this.props.handleChange) this.props.handleChange(e)
  }

  passChangeGeography(e) {
    e = new StandardizedInput(e)
    this.props.handleChangeGeography({ e })
    if (this.props.handleChange) this.props.handleChange(e)
  }

  showGeographyId() {
    if (this.props.changingGeographyType) return true

    return !!(this.props.currentGeographyType && this.props.currentGeographyType !== b.CITY_GEOGRAPHY.constant)
  }

  render() {
    return (
      <div data-test-id="geography-select" className="geography-select">
        <ConfigContext.Consumer>
          {config => (
            <div className="geography-select__row">
              <Form.Control
                required
                data-test-id="geography-select--type"
                className={classnames(this.props.selectClass, {
                  valued: this.props.currentGeographyType || this.props.changingGeographyType,
                })}
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
                <option disabled value={-1} key={'select-a-geography--nil'}>
                  {this.props.placeholder || 'Select a geography'}
                </option>
                <option value={b.COUNCIL_GEOGRAPHY.constant}>{b.COUNCIL_GEOGRAPHY.name}</option>
                <option value={b.COMMUNITY_GEOGRAPHY.constant}>{b.COMMUNITY_GEOGRAPHY.name}</option>
                <option value={b.STATE_ASSEMBLY_GEOGRAPHY.constant}>{b.STATE_ASSEMBLY_GEOGRAPHY.name}</option>
                <option value={b.STATE_SENATE_GEOGRAPHY.constant}>{b.STATE_SENATE_GEOGRAPHY.name}</option>
                <option value={b.ZIPCODE_GEOGRAPHY.constant}>{b.ZIPCODE_GEOGRAPHY.name}</option>
                {this.props.withBoroughs && (
                  <option value={b.BOROUGH_GEOGRAPHY.constant}>{b.BOROUGH_GEOGRAPHY.name}</option>
                )}
                {this.props.withBoroughs && <option value={b.CITY_GEOGRAPHY.constant}>{b.CITY_GEOGRAPHY.name}</option>}
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
              {this.showGeographyId() && (
                <div id="geography-id-select" className={classnames(this.props.selectClass)}>
                  {this.props.changingGeographyType === b.ZIPCODE_GEOGRAPHY.constant ||
                  (this.props.currentGeographyType === b.ZIPCODE_GEOGRAPHY.constant &&
                    !!this.props.currentGeographyId &&
                    !this.props.changingGeographyType) ? (
                    <div className="zip-select">
                      <CustomSelect
                        required
                        data-test-id="geography-select--custom"
                        data-key="id"
                        name="geographyId"
                        id="geography-custom-select"
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
                    </div>
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
                        this.props.changingGeographyType || this.props.currentGeographyType,
                        this.props.withBoroughs
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
          )}
        </ConfigContext.Consumer>
      </div>
    )
  }
}

GeographySelect.defaultProps = {
  inputSize: 'lg',
  selectClass: 'navbar-select',
  submitButtonVariant: 'primary',
  withBoroughs: false,
}

GeographySelect.propTypes = {
  cancelChangeGeography: PropTypes.func,
  config: PropTypes.object,
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
  selectClass: PropTypes.string,
  showSubmit: PropTypes.bool,
  submitButtonVariant: PropTypes.string,
  withBoroughs: PropTypes.bool,
}

export default GeographySelect

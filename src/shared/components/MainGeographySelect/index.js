import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions } from 'shared/utilities/componentUtils'
import { Form, Button } from 'react-bootstrap'
import StandardizedInput from 'shared/classes/StandardizedInput'
import LeafletMap from 'LeafletMap'

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

  render() {
    return (
      <div className="geography-select">
        <ConfigContext.Consumer>
          {config => (
            <div className="geography-select__wrapper">
              <div className="geography-select__row">
                <Form.Control
                  required
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
                  <option disabled value={-1} key={-1}>
                    {this.props.placeholder || 'Select'}
                  </option>
                  <option value={b.COUNCILGEOGRAPHY.constant}>{b.COUNCILGEOGRAPHY.name}</option>
                  <option value={b.COMMUNITYGEOGRAPHY.constant}>{b.COMMUNITYGEOGRAPHY.name}</option>
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
                  <div>
                    <Form.Control
                      required
                      as="select"
                      data-key="id"
                      name="geographyId"
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
                        this.props.changingGeographyType || this.props.currentGeographyType
                      )}
                    </Form.Control>
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
                    variant="outline-secondary"
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
                <a
                  href="#"
                  className="text-primary text-center font-weight-bold my-2"
                  onClick={this.handleShowMapClick}
                >
                  I don't know my district
                </a>
              )}
              {this.state.showMap && (
                <LeafletMap
                  councilDistricts={config.councilDistricts}
                  communityDistricts={config.communityDistricts}
                  className="main-geography-select__map"
                  selectGeographyData={config.selectGeographyData}
                  appState={this.props.appState}
                  currentGeographyType={this.props.changingGeographyType || this.props.currentGeographyType}
                  handleChangeGeography={this.passChangeType}
                  handleChangeGeographyId={this.passChangeGeography}
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

import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions } from 'shared/utilities/componentUtils'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'

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
    const standardE = new StandardizedInput(e)
    this.props.handleChangeGeography({
      geographyType: this.props.changingGeographyType || this.props.currentGeographyType,
      geographyId: standardE.value,
    })
    if (this.props.handleChange) this.props.handleChange(e)
  }

  render() {
    return (
      <ConfigContext.Consumer>
        {config => (
          <Form.Group as={Row}>
            <Col xs={!(this.props.changingGeographyType || this.props.currentGeographyType) ? 12 : 6}>
              <Form.Control
                required
                size="sm"
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
                  {this.props.placeholder || 'Select a Geography type'}
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
            </Col>
            {!!(this.props.currentGeographyType || this.props.changingGeographyType) && (
              <Col xs={6}>
                <Form.Control
                  required
                  as="select"
                  data-key="id"
                  name="geographyId"
                  onChange={this.passChangeGeography}
                  placeholder="#"
                  size="sm"
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
              </Col>
            )}
            {this.props.changing && (
              <Col xs={12}>
                <Button
                  className="cancel-Geography-change"
                  onClick={this.props.cancelChangeGeography}
                  variant="warning"
                >
                  Cancel
                </Button>
              </Col>
            )}
            {(this.props.showSubmit || this.props.changing) &&
              this.props.changingGeographyType &&
              this.props.changingGeographyId > 0 && (
                <Col xs={12}>
                  <Button
                    className="submit-Geography-change"
                    onClick={this.props.handleChangeGeography}
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Col>
              )}
          </Form.Group>
        )}
      </ConfigContext.Consumer>
    )
  }
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
  submitCount: PropTypes.number,
  touched: PropTypes.object,
  placeholder: PropTypes.string,
  showSubmit: PropTypes.bool,
}

export default GeographySelect

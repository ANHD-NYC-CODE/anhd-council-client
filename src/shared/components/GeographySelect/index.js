import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions } from 'shared/utilities/componentUtils'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

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

  render() {
    return (
      <div className="geography-select">
        <ConfigContext.Consumer>
          {config => (
            <Row>
              <Col xs={12} lg={this.props.changingGeographyType || this.props.currentGeographyType ? 6 : 12}>
                <Form.Control
                  required
                  className={this.props.selectClass}
                  size="lg"
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
                    {this.props.placeholder || 'Select a geography'}
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
                <Col className="mt-xs-2 mt-sm-2 mt-md-2 mt-lg-0" xs={12} lg={6}>
                  <Form.Control
                    required
                    as="select"
                    data-key="id"
                    name="geographyId"
                    onChange={this.passChangeGeography}
                    placeholder="#"
                    className={this.props.selectClass}
                    size="lg"
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
            </Row>
          )}
        </ConfigContext.Consumer>
        {(!!this.props.changingGeographyType || this.props.showSubmit) && (
          <Row className="mt-2">
            {!!this.props.changingGeographyType && (
              <Col xs={6}>
                <Button
                  block
                  size="lg"
                  className="cancel-geography-change"
                  onClick={this.props.cancelChangeGeography}
                  variant="warning"
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                  Cancel
                </Button>
              </Col>
            )}
            {this.props.showSubmit && (
              <Col xs={{ span: 6, offset: this.props.changingGeographyType ? 0 : 6 }}>
                <Button
                  block
                  size="lg"
                  className="submit-geography-change"
                  onClick={this.props.handleChangeGeography}
                  variant="primary"
                >
                  Go
                </Button>
              </Col>
            )}
          </Row>
        )}
      </div>
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

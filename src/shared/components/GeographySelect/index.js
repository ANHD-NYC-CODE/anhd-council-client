import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions } from 'shared/components/GeographySelect/utils'
import { Row, Col, Form, Button } from 'react-bootstrap'
import StandardizedInput from 'shared/classes/StandardizedInput'
import ConfigContext from 'Config/ConfigContext'
import FormError from 'shared/components/FormError'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
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

  render() {
    return (
      <div className="geography-select">
        <ConfigContext.Consumer>
          {config => (
            <Row>
              <Col xs={12} md={this.props.changingGeographyType || this.props.currentGeographyType ? 5 : 12}>
                <Form.Control
                  required
                  className={classnames(this.props.selectClass, {
                    valued: this.props.currentGeographyType || this.props.changingGeographyType,
                  })}
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
                <Col className="mt-2 mt-sm-2 mt-md-0" xs={12} md={5}>
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
              {!!this.props.changingGeographyType && !this.props.showSubmit && (
                <Col xs={12} md={2} className="mt-2 mt-md-0">
                  <Button
                    block
                    size="lg"
                    className="cancel-geography-change"
                    onClick={this.props.cancelChangeGeography}
                    variant="outline-secondary"
                  >
                    <FontAwesomeIcon size="lg" icon={faTimesCircle} />
                  </Button>
                </Col>
              )}
              {this.props.showSubmit && (
                <Col xs={12} md={2} className="mt-2 mt-md-0">
                  <Button
                    block
                    size="lg"
                    className="submit-geography-change"
                    onClick={this.props.handleChangeGeography}
                    variant={this.props.submitButtonVariant}
                  >
                    Go
                  </Button>
                </Col>
              )}
            </Row>
          )}
        </ConfigContext.Consumer>
      </div>
    )
  }
}

GeographySelect.defaultProps = {
  submitButtonVariant: 'primary',
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
  submitButtonVariant: PropTypes.string,
}

export default GeographySelect

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
    this.state = {
      changing: false,
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    }
    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleChangeGeography = this.handleChangeGeography.bind(this)
  }

  handleChangeType(e) {
    this.setState({
      changing: true,
      changingGeographyType: new StandardizedInput(e).value,
      changingGeographyId: -1,
    })
    if (this.props.handleChange) this.props.handleChange(e)
  }

  handleChangeGeography(e) {
    const standardE = new StandardizedInput(e)
    this.setState({ changing: false, changingGeographyType: undefined, changingGeographyId: undefined })
    this.props.onChange(this.state.changingGeographyType || this.props.currentGeographyType, standardE.value)
    if (this.props.handleChange) this.props.handleChange(e)
  }

  render() {
    return (
      <ConfigContext.Consumer>
        {config => (
          <Form.Group as={Row}>
            <Col xs={!(this.state.changingGeographyType || this.props.currentGeographyType) ? 12 : 6}>
              <Form.Control
                required
                size="sm"
                name="geographyType"
                as="select"
                data-key="geographyType"
                onChange={this.handleChangeType}
                value={this.state.changingGeographyType || this.props.currentGeographyType || -1}
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
            {!!(this.props.currentGeographyType || this.state.changingGeographyType) && (
              <Col xs={6}>
                <Form.Control
                  required
                  as="select"
                  data-key="id"
                  name="geographyId"
                  onChange={e => this.handleChangeGeography(e)}
                  placeholder="#"
                  size="sm"
                  value={this.state.changingGeographyId || this.props.currentGeographyId || -1}
                  onBlur={this.props.handleBlur}
                  isInvalid={
                    ((this.props.touched || {}).geographyId || !!this.props.submitCount) &&
                    (this.props.errors || {}).geographyId
                  }
                >
                  {getGeographyIdOptions(
                    config.councilDistricts,
                    config.communityDistricts,
                    this.state.changingGeographyType || this.props.currentGeographyType
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
            {this.props.confirmChange && this.state.changing && (
              <Col xs={12}>
                <Button
                  className="cancel-Geography-change"
                  onClick={() =>
                    this.setState({
                      changing: false,
                      changingGeographyType: this.props.currentGeographyType,
                      changingGeographyId: this.props.currentGeographyId,
                    })
                  }
                  variant="warning"
                >
                  Cancel
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
  currentGeographyType: PropTypes.string,
  currentGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  config: PropTypes.object,
  dispatch: PropTypes.func,
  confirmChange: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  handleBlur: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  submitCount: PropTypes.number,
  handleChange: PropTypes.func,
}

export default GeographySelect

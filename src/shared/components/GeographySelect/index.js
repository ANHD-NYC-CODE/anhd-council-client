import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { getGeographyIdOptions } from 'shared/utilities/componentUtils'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import ConfigContext from 'Config/ConfigContext'

class GeographySelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      changing: false,
      geographyType: props.currentGeographyType,
      geographyId: props.currentGeographyId,
    }

    this.changeGeography = this.changeGeography.bind(this)
  }

  changeGeography(e) {
    this.props.onChange(this.state.geographyType, new StandardizedInput(e).value)
    this.setState({ changing: false })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.changing) {
      this.setState({
        geographyType: nextProps.currentGeographyType,
        geographyId: nextProps.currentGeographyId,
      })
    }
  }

  render() {
    return (
      <ConfigContext.Consumer>
        {config => (
          <Form.Group as={Row}>
            <Col xs={!this.state.geographyType ? 12 : 6}>
              <Form.Control
                required
                size="sm"
                name="geographyType"
                as="select"
                data-key="geographyType"
                onChange={e =>
                  this.setState({
                    changing: true,
                    geographyType: new StandardizedInput(e).value,
                    geographyId: -1,
                  })
                }
                value={this.state.geographyType || -1}
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
            </Col>
            {!!this.state.geographyType && (
              <Col xs={6}>
                <Form.Control
                  required
                  as="select"
                  data-key="id"
                  name="geographyId"
                  onChange={e => this.changeGeography(e)}
                  placeholder="#"
                  size="sm"
                  value={this.state.geographyId || -1}
                  onBlur={this.props.handleBlur}
                  isInvalid={
                    ((this.props.touched || {}).geographyId || !!this.props.submitCount) &&
                    (this.props.errors || {}).geographyId
                  }
                >
                  {getGeographyIdOptions(config.councilDistricts, config.communityDistricts, this.state.geographyType)}
                </Form.Control>
              </Col>
            )}
            {this.props.confirmChange && this.state.changing && (
              <Col xs={12}>
                <Button
                  className="cancel-Geography-change"
                  onClick={() =>
                    this.setState({
                      changing: false,
                      geographyType: this.props.currentGeographyType,
                      geographyId: this.props.currentGeographyId,
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
  currentGeographyId: PropTypes.string,
  config: PropTypes.object,
  dispatch: PropTypes.func,
  confirmChange: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.string,
  handleBlur: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  submitCount: PropTypes.number,
}

export default GeographySelect

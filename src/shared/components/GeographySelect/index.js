import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
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

    this.changeGeographyAndId = this.changeGeographyAndId.bind(this)
  }

  changeGeographyAndId(e) {
    this.setState({ changing: false })
    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: this.state.geographyType,
        geographyId: new StandardizedInput(e).value,
      })
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      geographyType: nextProps.currentGeographyType,
      geographyId: nextProps.currentGeographyId,
    })
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
                  })
                }
                value={this.state.geographyType || -1}
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
                  onChange={e => this.changeGeographyAndId(e)}
                  placeholder="#"
                  size="sm"
                  value={this.state.geographyId || -1}
                >
                  {getGeographyIdOptions(config.districts, config.boards, this.state.geographyType)}
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
  dispatch: PropTypes.func,
  confirmChange: PropTypes.bool,
  placeholder: PropTypes.string,
}

export default GeographySelect

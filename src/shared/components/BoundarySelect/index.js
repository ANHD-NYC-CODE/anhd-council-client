import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/boundaries'
import { setBoundaryTypeAndIdAndRedirect } from 'Store/AppState/actions'
import { getBoundaryIdOptions } from 'shared/utilities/componentUtils'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import ConfigContext from 'Config/ConfigContext'

class BoundarySelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      changing: false,
      boundaryType: props.currentBoundaryType,
      boundaryId: props.currentBoundaryId,
    }

    this.changeBoundaryAndId = this.changeBoundaryAndId.bind(this)
  }

  changeBoundaryAndId(e) {
    this.setState({ changing: false })
    this.props.dispatch(setBoundaryTypeAndIdAndRedirect(this.state.boundaryType, new StandardizedInput(e).value))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      boundaryType: nextProps.currentBoundaryType,
      boundaryId: nextProps.currentBoundaryId,
    })
  }

  render() {
    return (
      <ConfigContext.Consumer>
        {config => (
          <Form.Group as={Row}>
            <Col xs={6}>
              <Form.Control
                required
                size="sm"
                placeholder="Search boundary"
                name="boundaryType"
                as="select"
                data-key="boundaryType"
                onChange={e =>
                  this.setState({
                    changing: true,
                    boundaryType: new StandardizedInput(e).value,
                  })
                }
                value={this.state.boundaryType || -1}
              >
                <option disabled value={-1} key={-1}>
                  Select a boundary type
                </option>
                <option value={b.COUNCILBOUNDARY.constant}>{b.COUNCILBOUNDARY.name}</option>
                <option value={b.COMMUNITYBOUNDARY.constant}>{b.COMMUNITYBOUNDARY.name}</option>
              </Form.Control>
            </Col>
            {!!this.state.boundaryType && (
              <Col xs={6}>
                <Form.Control
                  required
                  as="select"
                  data-key="id"
                  name="boundaryId"
                  onChange={e => this.changeBoundaryAndId(e)}
                  placeholder="#"
                  size="sm"
                  value={this.state.boundaryId || -1}
                >
                  {getBoundaryIdOptions(config.districts, config.boards, this.state.boundaryType)}
                </Form.Control>
              </Col>
            )}
            {this.props.confirmChange && this.state.changing && (
              <Col xs={12}>
                <Button
                  className="cancel-boundary-change"
                  onClick={() =>
                    this.setState({
                      changing: false,
                      boundaryType: this.props.currentBoundaryType,
                      boundaryId: this.props.currentBoundaryId,
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

BoundarySelect.propTypes = {
  currentBoundaryType: PropTypes.string,
  currentBoundaryId: PropTypes.string,
  dispatch: PropTypes.func,
  confirmChange: PropTypes.bool,
}

export default BoundarySelect

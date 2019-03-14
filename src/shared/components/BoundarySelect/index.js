import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/boundaries'
import { handleSetBoundaryTypeAndId } from 'Store/AppState/actions'
import { getBoundaryIdOptions } from 'shared/utilities/componentUtils'
import { Row, Col, Form } from 'react-bootstrap'
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

    this.changeBoundaryType = this.changeBoundaryType.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      boundaryType: nextProps.currentBoundaryType,
      boundaryId: nextProps.currentBoundaryId,
    })
  }

  changeBoundaryType(e) {
    e = new StandardizedInput(e)
    this.setState({
      boundaryType: e.value,
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
                onChange={this.changeBoundaryType}
                value={this.state.boundaryType || -1}
              >
                <option disabled value={-1} key={-1}>
                  Select a geography
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
                  onChange={e =>
                    this.props.dispatch(
                      handleSetBoundaryTypeAndId(this.state.boundaryType, new StandardizedInput(e).value)
                    )
                  }
                  placeholder="#"
                  size="sm"
                  value={this.state.boundaryId || -1}
                >
                  {getBoundaryIdOptions(config.districts, config.boards, this.state.boundaryType)}
                </Form.Control>
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
}

export default BoundarySelect

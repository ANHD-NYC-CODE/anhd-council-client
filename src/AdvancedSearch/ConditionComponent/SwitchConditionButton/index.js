import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Overlay, Tooltip, DropdownButton, Dropdown } from 'react-bootstrap'
class SwitchConditionButton extends React.Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()
  }

  componentDidMount() {
    if (this.props.showPopups) {
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div>
        <Overlay position={'left'} show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Switch the logical condition type (and | or)</Tooltip>
          }}
        </Overlay>
        <DropdownButton
          ref={this.ref}
          className="control-button"
          as={ButtonGroup}
          title={this.props.condition.type}
          size="lg"
          variant="success"
          id="bg-vertical-dropdown-1"
        >
          <Dropdown.Item
            className="control-button"
            eventKey="1"
            size="lg"
            onClick={() => this.props.switchCondition('AND')}
          >
            And
          </Dropdown.Item>
          <Dropdown.Item
            className="control-button"
            eventKey="2"
            size="lg"
            onClick={() => this.props.switchCondition('OR')}
          >
            Or
          </Dropdown.Item>
        </DropdownButton>
      </div>
    )
  }
}

SwitchConditionButton.propTypes = {}

export default SwitchConditionButton

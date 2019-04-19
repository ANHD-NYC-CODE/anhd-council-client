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
      <DropdownButton
        ref={this.ref}
        as={ButtonGroup}
        title={this.props.condition.type === 'AND' ? 'all' : 'any'}
        size="sm"
        variant="success"
        id="bg-vertical-dropdown-1"
      >
        <Overlay position={'top'} show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Switch the condition type (AND / OR)</Tooltip>
          }}
        </Overlay>
        <Dropdown.Item
          className="control-button"
          eventKey="1"
          size="sm"
          onClick={() => this.props.switchCondition('AND')}
        >
          All
        </Dropdown.Item>
        <Dropdown.Item
          className="control-button"
          eventKey="2"
          size="sm"
          onClick={() => this.props.switchCondition('OR')}
        >
          Any
        </Dropdown.Item>
      </DropdownButton>
    )
  }
}

SwitchConditionButton.propTypes = {}

export default SwitchConditionButton

import React from 'react'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

class RemoveConditionButton extends React.PureComponent {
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
      <Button
        className="remove-condition"
        size="sm"
        ref={this.ref}
        onClick={() => this.props.removeCondition(this.props.condition.key)}
        variant="outline-danger"
      >
        <Overlay placement="top" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Remove this filter group</Tooltip>
          }}
        </Overlay>
        <FontAwesomeIcon icon={faMinus} /> Remove filter group
      </Button>
    )
  }
}

RemoveConditionButton.propTypes = {}

export default RemoveConditionButton

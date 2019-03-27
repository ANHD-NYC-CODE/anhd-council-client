import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
class RemoveConditionButton extends React.Component {
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
        <Overlay placement="left" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Remove the entire logical condition</Tooltip>
          }}
        </Overlay>

        <Button
          className="control-button remove-condition"
          size="lg"
          ref={this.ref}
          onClick={() => this.props.removeCondition(this.props.condition.key)}
          variant="outline-danger"
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </div>
    )
  }
}

RemoveConditionButton.propTypes = {}

export default RemoveConditionButton

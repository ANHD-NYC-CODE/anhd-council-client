import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class AddConditionButton extends React.Component {
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
      <div className="ml-2">
        <Overlay placement="right" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Add a new logical condition within the current one.</Tooltip>
          }}
        </Overlay>
        <Button
          className="add-condition"
          size="lg"
          onClick={e => {
            e.preventDefault()
            this.props.addCondition()
          }}
          ref={this.ref}
          variant="info"
        >
          <FontAwesomeIcon icon={faPlus} /> {this.props.condition.type === 'AND' ? '(OR)' : '(AND)'}
        </Button>
      </div>
    )
  }
}

AddConditionButton.propTypes = {}

export default AddConditionButton

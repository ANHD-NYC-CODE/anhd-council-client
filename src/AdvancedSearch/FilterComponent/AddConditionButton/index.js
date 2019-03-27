import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
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
      <div>
        <Overlay placement="bottom" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Create a new logical condition and add this filter to it.</Tooltip>
          }}
        </Overlay>

        <Button
          ref={this.ref}
          className="filter-control add-condition"
          onClick={() => this.props.addCondition(this.props.filterIndex)}
          variant="success"
        >
          <FontAwesomeIcon icon={faProjectDiagram} />
        </Button>
      </div>
    )
  }
}

AddConditionButton.propTypes = {}

export default AddConditionButton

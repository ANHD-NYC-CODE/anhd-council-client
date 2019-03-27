import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class AddFilterButton extends React.Component {
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
            return <Tooltip {...props}>Add a filter to this condition</Tooltip>
          }}
        </Overlay>
        <Button
          className="add-filter"
          size="lg"
          onClick={e => {
            e.preventDefault()
            this.props.createNewFilter()
          }}
          ref={this.ref}
          variant="success"
        >
          <FontAwesomeIcon icon={faPlus} /> New filter
        </Button>
      </div>
    )
  }
}

AddFilterButton.propTypes = {}

export default AddFilterButton

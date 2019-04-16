import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class AddConditionButton extends React.PureComponent {
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
        className="add-condition"
        size="sm"
        onClick={e => {
          e.preventDefault()
          this.props.addCondition()
        }}
        ref={this.ref}
        variant="info"
      >
        <Overlay placement="top" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Create a filter group with these filters</Tooltip>
          }}
        </Overlay>
        <FontAwesomeIcon icon={faPlus} /> Create filter group
      </Button>
    )
  }
}

AddConditionButton.propTypes = {
  addCondition: PropTypes.func,
  condition: PropTypes.object,
  filterIndex: PropTypes.number,
  showPopups: PropTypes.bool,
}

export default AddConditionButton

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
class AddInnerConditionButton extends React.PureComponent {
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
        ref={this.ref}
        className="filter-control add-condition"
        onClick={() => this.props.addCondition(this.props.filterIndex)}
        variant="success"
      >
        <Overlay placement="bottom" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Create a new filter group.</Tooltip>
          }}
        </Overlay>
        <FontAwesomeIcon icon={faProjectDiagram} />
      </Button>
    )
  }
}

AddInnerConditionButton.defaultProps = {
  filterIndex: undefined,
}

AddInnerConditionButton.propTypes = {
  addCondition: PropTypes.func,
  condition: PropTypes.object,
  filterIndex: PropTypes.number,
  showPopups: PropTypes.bool,
}

export default AddInnerConditionButton

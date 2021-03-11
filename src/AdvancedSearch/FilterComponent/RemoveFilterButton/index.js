import React from 'react'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class RemoveFilterButton extends React.PureComponent {
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
        <Overlay placement="top" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Remove this filter</Tooltip>
          }}
        </Overlay>

        <Button
          className="filter-control remove-filter"
          onClick={this.props.removeFilter}
          ref={this.ref}
          size="sm"
          variant="link"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    )
  }
}

RemoveFilterButton.propTypes = {}

export default RemoveFilterButton

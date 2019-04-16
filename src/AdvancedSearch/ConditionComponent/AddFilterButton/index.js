import React from 'react'
import PropTypes from 'prop-types'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class AddFilterButton extends React.PureComponent {
  constructor(props) {
    super(props)

    this.ref = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.showPopups) {
      this.forceUpdate()
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.props.createNewFilter()
    if (this.props.onClick) this.props.onClick()
  }

  render() {
    return (
      <Button className="mt-2 add-filter" size="lg" onClick={e => this.handleClick(e)} ref={this.ref} variant="success">
        <Overlay placement="bottom" show={this.props.showPopups} target={this.ref.current}>
          {props => {
            return <Tooltip {...props}>Add a filter to this condition</Tooltip>
          }}
        </Overlay>
        <FontAwesomeIcon icon={faPlus} /> {this.props.text}
      </Button>
    )
  }
}
AddFilterButton.defaultProps = {
  text: 'New Filter',
}
AddFilterButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
}

export default AddFilterButton

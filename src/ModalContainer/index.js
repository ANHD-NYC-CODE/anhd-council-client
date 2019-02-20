import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ModalContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal-container">{this.props.render ? this.props.render(this.props.modal.modalProps) : null}</div>
    )
  }
}

ModalContainer.propTypes = {
  dispatch: PropTypes.func,
  modal: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
    render: state.modal.type ? modalProps => state.modal.type(modalProps) : null,
  }
}

export default connect(mapStateToProps)(ModalContainer)

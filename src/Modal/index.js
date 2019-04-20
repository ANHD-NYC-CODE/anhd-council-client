import React from 'react'
import PropTypes from 'prop-types'
import ModalContext from 'Modal/ModalContext'
import BaseModal from 'shared/components/BaseModal'

import './style.scss'

class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.setModal = this.setModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)

    this.state = {
      modalComponent: BaseModal,
      modalProps: {
        centered: true,
        className: 'base-modal',
        labelId: 'baseModal',
        modalFooter: undefined,
        hideModal: this.hideModal,
        title: 'Modal Title',
      },
      show: false,
    }
  }

  setModal({ modalComponent = BaseModal, modalProps }) {
    this.setState({
      modalComponent,
      modalProps,
      show: true,
    })
  }

  hideModal() {
    this.setState({
      show: false,
    })
  }

  showModal() {
    this.setState({
      show: true,
    })
  }

  render() {
    const ModalComponent = this.state.modalComponent
    return (
      <ModalContext.Provider
        value={{
          modalComponent: this.state.modalComponent,
          modalProps: this.state.modalProps,
          hideModal: this.hideModal,
          showModal: this.showModal,
          setModal: this.setModal,
        }}
      >
        <ModalComponent hideModal={this.hideModal} show={this.state.show} {...this.state.modalProps} />

        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func,
}

export default Modal

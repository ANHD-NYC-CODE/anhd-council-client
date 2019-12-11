import React from 'react'
import PropTypes from 'prop-types'
import ModalContext from 'Modal/ModalContext'
import WhyLoginModal from 'shared/components/modals/WhyLoginModal'
const WhyLoginButton = props => {
  return (
    // <ModalContext.Consumer>
    //   {modal => {
    //     return (
    //       <div
    //         className="info-modal-button"
    //         onClick={e => {
    //           e.preventDefault()
    //           modal.setModal({
    //             modalComponent: WhyLoginModal,
    //           })
    //         }}
    //       >
    //         Why?
    //       </div>
    //     )
    //   }}
    // </ModalContext.Consumer>
  )
}

WhyLoginButton.propTypes = {}

export default WhyLoginButton

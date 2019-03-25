import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import ConfigContext from 'Config/ConfigContext'
import ModalContext from 'Modal/ModalContext'
import './style.scss'
const InfoModalButton = props => {
  return (
    <ConfigContext.Consumer>
      {config => {
        if (!config.infoModals[props.modalConstant]) return null
        return (
          <ModalContext.Consumer>
            {modal => {
              return (
                <FontAwesomeIcon
                  className="info-modal-button"
                  icon={faQuestion}
                  onClick={() =>
                    modal.setModal({
                      modalProps: {
                        title: config.infoModals[props.modalConstant].title,
                        body: config.infoModals[props.modalConstant].body,
                      },
                    })
                  }
                />
              )
            }}
          </ModalContext.Consumer>
        )
      }}
    </ConfigContext.Consumer>
  )
}

InfoModalButton.propTypes = {
  modalConstant: PropTypes.string,
}

export default InfoModalButton

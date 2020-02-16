import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import ConfigContext from 'Config/ConfigContext'
import ModalContext from 'Modal/ModalContext'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'
import classnames from 'classnames'

import './style.scss'
const InfoModalButton = props => {
  const handleClick = (e, modal, config) => {
    e.preventDefault()

    modal.setModal({
      modalProps: {
        title: config.infoModals[props.modalConstant].title,
        body: config.infoModals[props.modalConstant].body,
        sources: config.infoModals[props.modalConstant].sources,
        documentationBody: config.infoModals[props.modalConstant].documentationBody,
        documentationSources: config.infoModals[props.modalConstant].documentationSources,
        size: 'lg',
      },
    })
  }
  return (
    <ConfigContext.Consumer>
      {config => {
        if (!config.infoModals[props.modalConstant])
          return <div className={classnames('info-modal-button', props.className)} />
        return (
          <ModalContext.Consumer>
            {modal => {
              return (
                <FontAwesomeIcon
                  tabIndex="0"
                  className={classnames('info-modal-button', props.className)}
                  icon={faQuestion}
                  onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick(e, modal, config))}
                  onClick={e => handleClick(e, modal, config)}
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
  className: PropTypes.string,
  modalConstant: PropTypes.string,
}

export default InfoModalButton

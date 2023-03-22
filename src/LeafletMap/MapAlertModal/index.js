import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { Button, Alert } from 'react-bootstrap'
import jQuery from 'jquery'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'
import './style.scss'


const MapAlertModal = props => {
  const [isLoading, toggleLoading] = useState(false)

  const handleClick2 = e => {
    e.preventDefault(),
      jQuery('.map-alert-modal').css('display', 'none')
  }

  const handleClick = e => {
    e.preventDefault(),
      toggleLoading(false),
      props.action()
  }


  // 


  return (
    <div className="map-alert-modal">

      <Alert className="map-alert-modal__alert" variant={props.alertVariant}>
        <Button
          className="modalCloseButton"
          onClick={handleClick2}
          onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick2(e))}
        >
          <h3
            className="modalCloseButtonText"
          >
            X
          </h3>
        </Button>
        <span className="map-alert-modal__text" style={{
          'text-align': 'center',
          'margin-top': '5px'
        }}>{props.alertMessage}</span>
        <div
          className="btn-box"
          style={{
            display: 'flex',
            width: 'fit-content',
            margin: '10px auto 5px',
            'flex-direction': 'column',
            'justify-content': 'center'
          }}>
          <Button
            className="btn-loader"
            style={{ margin: '5px' }}
            variant="primary"
            size="sm"
            onClick={handleClick2}
            onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick2(e))}
          >
            {props.alertCta}
            <div className="button-loader__container">{isLoading && <SpinnerLoader size="20px" />}</div>
          </Button>

          <Button
            style={{ margin: '5px' }}
            className="btn-loader"
            variant="primary"
            size="sm"
            onClick={handleClick}
            onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick(e))}
          >
            {props.alertCta2}
            <div className="button-loader__container">{isLoading && <SpinnerLoader size="20px" />}</div>
          </Button>
        </div>
      </Alert>
    </div>
  )
}

MapAlertModal.propTypes = {
  action: PropTypes.func,
  alertMessage: PropTypes.string,
  alertVariant: PropTypes.string,
  alertCta: PropTypes.string,
}
MapAlertModal.defaultProps = {
  alertVarient: 'light',
  alertCta: 'Ok',
}

export default MapAlertModal

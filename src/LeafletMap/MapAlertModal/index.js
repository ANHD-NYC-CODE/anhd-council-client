import React from 'react'
import PropTypes from 'prop-types'
import { Button, Alert } from 'react-bootstrap'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'
import './style.scss'

const MapAlertModal = props => {
  return (
    <div className="map-alert-modal">
      <Alert className="map-alert-modal__alert" variant={props.alertVariant}>
        <span className="map-alert-modal__text">{props.alertMessage}</span>
        <Button
          variant="primary"
          size="sm"
          onClick={props.action}
          onKeyDown={e => spaceEnterKeyDownHandler(e, () => props.action())}
        >
          {props.alertCta}
        </Button>
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

import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button } from 'react-bootstrap'
const TableAlert = props => {
  return (
    <Alert variant={props.variant} className="table-alert">
      <h6 className={props.textType}>{props.message}</h6>
      {props.action && (
        <Button variant={props.buttonVariant} onClick={props.action}>
          {props.buttonText}
        </Button>
      )}
    </Alert>
  )
}

TableAlert.defaultProps = {
  action: undefined,
  buttonText: 'Proceed',
  buttonVariant: 'primary',
  textType: '',
  variant: '',
  message: '',
}

TableAlert.propTypes = {
  action: PropTypes.func,
  buttonText: PropTypes.string,
  buttonVariant: PropTypes.string,
  textType: PropTypes.string,
  variant: PropTypes.string,
  message: PropTypes.object,
}

export default TableAlert

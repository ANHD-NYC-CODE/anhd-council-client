import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button } from 'react-bootstrap'
const TableAlert = props => {
  return (
    <Alert variant={props.variant} className="table-alert">
      <p className={props.textType}>{props.message}</p>
      {!!props.action && (
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
  textType: 'text-danger',
  variant: 'danger',
  message: '',
}

TableAlert.propTypes = {
  action: PropTypes.func,
  buttonText: PropTypes.string,
  buttonVariant: PropTypes.string,
  textType: PropTypes.string,
  variant: PropTypes.string,
  message: PropTypes.string,
}

export default TableAlert

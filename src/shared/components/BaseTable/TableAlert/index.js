import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button } from 'react-bootstrap'
const TableAlert = props => {
  return (
    <Alert variant={props.variant} className="table-alert">
      <h6 className={props.textType}>{props.message}</h6>
      {props.action && (
        <Button variant="primary" onClick={props.action}>
          Proceed
        </Button>
      )}
    </Alert>
  )
}

TableAlert.propTypes = {
  action: PropTypes.func,
  textType: PropTypes.string,
  variant: PropTypes.string,
  message: PropTypes.object,
}

export default TableAlert

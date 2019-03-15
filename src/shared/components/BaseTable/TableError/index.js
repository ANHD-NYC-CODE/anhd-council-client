import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button } from 'react-bootstrap'
const TableError = props => {
  return (
    <Alert variant="danger" className="table-error">
      <h6 className="text-danger">{props.error.message}</h6>
      {props.errorAction && (
        <Button variant="primary" onClick={props.errorAction}>
          Proceed
        </Button>
      )}
    </Alert>
  )
}

TableError.propTypes = {
  errorAction: PropTypes.func,
  error: PropTypes.object,
}

export default TableError

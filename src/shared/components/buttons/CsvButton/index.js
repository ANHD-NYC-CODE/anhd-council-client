import React from 'react'
import PropTypes from 'prop-types'
import { makeCsvRequest } from 'Store/Request/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

import './style.scss'
const CsvButton = props => {
  return (
    <a
      className={classnames('csv-button', props.className)}
      onClick={
        props.onClick
          ? props.onClick
          : e => {
              e.preventDefault()
              props.dispatch(makeCsvRequest(props.request))
            }
      }
    >
      <FontAwesomeIcon icon={faFileCsv} />
      <span>Csv</span>
    </a>
  )
}

CsvButton.propTypes = {
  onClick: PropTypes.func,
}

export default CsvButton

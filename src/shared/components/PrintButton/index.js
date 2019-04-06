import React from 'react'
import PropTypes from 'prop-types'
import LayoutContext from 'Layout/LayoutContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'react-bootstrap'

import './style.scss'

const PrintButton = props => {
  return (
    <div className="print-button">
      <LayoutContext.Consumer>
        {layout => (
          <a
            className={props.textClass}
            href="#"
            onClick={e => {
              e.preventDefault()
              layout.togglePrint(props.title)
            }}
          >
            <FontAwesomeIcon size="sm" icon={faPrint} />
            <h5 className="d-inline"> Print</h5>
          </a>
        )}
      </LayoutContext.Consumer>
    </div>
  )
}

PrintButton.propTypes = {
  textClass: PropTypes.string,
  title: PropTypes.string,
}

export default PrintButton

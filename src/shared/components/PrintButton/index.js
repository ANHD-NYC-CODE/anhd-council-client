import React from 'react'
import PropTypes from 'prop-types'
import LayoutContext from 'Layout/LayoutContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

import './style.scss'

const PrintButton = props => {
  return (
    <div className="print-button">
      <LayoutContext.Consumer>
        {layout => (
          <button
            tabIndex="-1"
            className={props.textClass}
            href="#"
            onKeyDown={e => spaceEnterKeyDownHandler(e, () => layout.togglePrint(props.title))}
            onClick={e => {
              e.preventDefault()
              layout.togglePrint(props.title)
            }}
          >
            <FontAwesomeIcon size="sm" icon={faPrint} />
            <h5 className="d-inline"> Print</h5>
          </button>
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

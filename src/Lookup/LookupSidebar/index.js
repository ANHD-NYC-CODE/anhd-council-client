import React, { useState } from 'react'
import PropTypes from 'prop-types'

import LookupProfileSummary from 'Lookup/LookupProfileSummary'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import classnames from 'classnames'
import './style.scss'

const LookupSidebar = props => {
  const [open, toggleOpen] = useState(true)

  const handleToggleKeyDown = e => {
    // space or enter or escape
    if (e.keyCode === 13 || e.keyCode === 32 || (open && e.keyCode === 27)) {
      e.preventDefault()
      e.currentTarget.blur()
      toggleOpen(!open)
    }
  }

  const handleClick = e => {
    e.preventDefault()
    e.currentTarget.blur()
    toggleOpen(!open)
  }

  return (
    <div className={classnames('lookup-sidebar full-bleed--mobile', { open })}>
      <div className="lookup-sidebar__wrapper">
        <div
          tabIndex="0"
          role="button"
          aria-label="Toggle Sidebar"
          className="lookup-sidebar__toggle"
          onKeyDown={handleToggleKeyDown}
          onClick={e => handleClick(e)}
        >
          <FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} size="1x" />
        </div>
        <div className="lookup-sidebar__body">
          <div className="lookup-sidebar__header">
            <h4>Property Info</h4>
          </div>
          <div className="lookup-sidebar__content">
            <LookupProfileSummary
              appState={props.appState}
              error={props.error}
              loading={props.loading}
              propertyResult={props.propertyResult}
              request={props.profileRequest}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

LookupSidebar.propTypes = {
  appState: PropTypes.object,
  loading: PropTypes.bool,
  profileRequest: PropTypes.object,
  propertyResult: PropTypes.object,
}

export default LookupSidebar

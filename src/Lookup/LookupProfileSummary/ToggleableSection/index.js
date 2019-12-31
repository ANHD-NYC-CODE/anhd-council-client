import React, { useState } from 'react'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const ToggleableSection = props => {
  const [open, toggleOpen] = useState(props.startsOpen)

  const handleClick = e => {
    e.preventDefault()
    toggleOpen(!open)
  }

  return (
    <div className="toggleable-section">
      <div
        className="lookup-profile-summary__section-header"
        tabIndex="0"
        role="button"
        onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick(e))}
        onClick={e => handleClick(e)}
      >
        <h5>{props.title}</h5>
        {open ? <FontAwesomeIcon size="lg" icon={faChevronUp} /> : <FontAwesomeIcon size="lg" icon={faChevronDown} />}
      </div>
      {open && props.children}
    </div>
  )
}

ToggleableSection.propTypes = {
  startsOpen: PropTypes.bool,
  title: PropTypes.string,
}
ToggleableSection.defaultProps = {
  startsOpen: false,
}

export default ToggleableSection

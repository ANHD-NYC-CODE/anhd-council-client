import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

import './style.scss'

const ExpandableSection = props => {
  const [isExpanded, toggleExpansion] = useState(props.startsOpen)

  const handleClick = e => {
    e.preventDefault()
    toggleExpansion(!isExpanded)
  }

  const renderIcon = () => {
    return isExpanded ? props.collapseIcon : props.expandIcon
  }

  return (
    <div className="expandable-section">
      <div className="expandable-section__above-fold">
        <div
          tabIndex="0"
          role="button"
          onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick(e))}
          onClick={e => handleClick(e)}
          className={classnames('expandable-section__above-fold--element', props.className)}
        >
          {props.aboveFoldElement}
        </div>
        <div className={classnames(props.iconClass)}>&nbsp;{renderIcon()}</div>
      </div>
      <div className="expandable-section__below-fold">{isExpanded && props.children}</div>
    </div>
  )
}

ExpandableSection.defaultProps = {
  expandIcon: <strong>+</strong>,
  collapseIcon: <strong>-</strong>,
  iconClass: 'expandable-section__above-fold--icon',
  startsOpen: false,
}

ExpandableSection.propTypes = {
  aboveFoldElement: PropTypes.object,
  className: PropTypes.string,
  collapseIcon: PropTypes.object,
  expandIcon: PropTypes.object,
  startsOpen: PropTypes.bool,
}

export default ExpandableSection

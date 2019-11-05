import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './style.scss'

const ExpandableSection = props => {
  const [isExpanded, toggleExpansion] = useState(false)

  const renderIcon = () => {
    return isExpanded ? props.collapseIcon : props.expandIcon
  }

  return (
    <div className={classnames('expandable-section', props.className)} onClick={() => toggleExpansion(!isExpanded)}>
      <div className="expandable-section__above-fold">
        <div className="expandable-section__above-fold--element">{props.aboveFoldElement}</div>
        <div className="expandable-section__above-fold--icon">&nbsp;{renderIcon()}</div>
      </div>
      <div className="expandable-section__below-fold">{isExpanded && props.children}</div>
    </div>
  )
}

ExpandableSection.defaultProps = {
  expandIcon: <strong>+</strong>,
  collapseIcon: <strong>-</strong>,
}

ExpandableSection.propTypes = {
  aboveFoldElement: PropTypes.object,
  className: PropTypes.string,
  expandIcon: PropTypes.object,
  collapseIcon: PropTypes.object,
}

export default ExpandableSection

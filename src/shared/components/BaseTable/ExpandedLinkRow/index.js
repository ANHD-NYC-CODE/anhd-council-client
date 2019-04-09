import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'
const ExpandedLinkRow = props => {
  return (
    <div bg="light" border="secondary" className="expanded-row">
      <div className="expanded-row--wrapper">
        <div className="p-2">
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  )
}

ExpandedLinkRow.propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
}

export default ExpandedLinkRow

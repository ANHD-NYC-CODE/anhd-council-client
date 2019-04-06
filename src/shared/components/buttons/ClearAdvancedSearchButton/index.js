import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'
import classnames from 'classnames'
const ClearAdvancedSearchButton = props => {
  return (
    <ConfigContext.Consumer>
      {config => {
        return (
          <div
            className={classnames('clear-advanced-search-button', props.className)}
            onClick={config.clearAdvancedSearch}
          >
            {props.children}
          </div>
        )
      }}
    </ConfigContext.Consumer>
  )
}

export default ClearAdvancedSearchButton

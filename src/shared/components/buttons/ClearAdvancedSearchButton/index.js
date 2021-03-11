import React from 'react'
import ConfigContext from 'Config/ConfigContext'
import classnames from 'classnames'

import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

const ClearAdvancedSearchButton = props => (
  <ConfigContext.Consumer>
    {config => {
      return (
        <div
          tabIndex="-1"
          className={classnames('clear-advanced-search-button text-link', props.className)}
          onClick={config.clearAdvancedSearch}
          onKeyDown={e => spaceEnterKeyDownHandler(e, config.clearAdvancedSearch)}
          role="button"
          aria-label="Clear Advanced Search"
        >
          {props.children}
        </div>
      )
    }}
  </ConfigContext.Consumer>
)

export default ClearAdvancedSearchButton

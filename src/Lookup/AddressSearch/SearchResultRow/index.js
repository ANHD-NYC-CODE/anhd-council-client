import React from 'react'
import PropTypes from 'prop-types'
import { addressResultToPath } from 'shared/utilities/routeUtils'

import './style.scss'

const SearchResultRow = props => {
  if (props.result.number) {
    return (
      <div
        ref={props.currentResultFocusRef}
        tabIndex={0}
        className="search-result-row"
        onKeyDown={props.onKeyDown}
        onClick={e => props.onClick(e, props.result)}
        to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
      >
        <div className="d-flex">
          <span>{`${props.result.number} ${props.result.street ? props.result.street.trim() : ''}, ${
            props.result.borough
          }`}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="search-result-row no-result">
        <span>No results.</span>
      </div>
    )
  }
}

SearchResultRow.propTypes = {
  selectBuildingResult: PropTypes.func,
  dispatch: PropTypes.func,
  onClick: PropTypes.func,
  result: PropTypes.object,
}

export default SearchResultRow

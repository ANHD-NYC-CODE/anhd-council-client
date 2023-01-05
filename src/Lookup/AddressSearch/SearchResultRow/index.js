import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { addressResultToPath } from 'shared/utilities/routeUtils'

import './style.scss'

// https://github.com/NYCPlanning/labs-geosearch-docker/blob/master/MIGRATING.md

const SearchResultRow = props => {
  const { result } = props
  if (result.label) {
    return (
      <Link
        role="button"
        ref={props.currentResultFocusRef}
        tabIndex={0}
        className="search-result-row d-flex"
        onKeyDown={props.onKeyDown}
        onFocus={() => props.setResultFocusIndex(props.resultIndex)}
        // onClick={e => props.onClick(e, result)}
        to={addressResultToPath({ bbl: result.addendum.pad.bbl, bin: result.addendum.pad.bin })}
      >
        {props.result.label}
      </Link>
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
  resultIndex: PropTypes.number,
  setResultFocusIndex: PropTypes.func,
}

export default SearchResultRow

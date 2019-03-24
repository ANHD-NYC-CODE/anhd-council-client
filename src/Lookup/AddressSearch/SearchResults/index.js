import React from 'react'
import PropTypes from 'prop-types'
import SearchResultRow from 'Lookup/AddressSearch/SearchResultRow'

import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'

import './style.scss'

const SearchResults = props => {
  const handleRowClick = (e, result) => {
    e.preventDefault()
    props.dispatch(setLookupAndRequestsAndRedirect({ bbl: result.bbl, bin: result.bin }))
  }

  return (
    <div ref={props.searchResultsRef} className="search-results">
      {props.loading && <div className="text-info">loading</div>}
      {props.error && <div className="text-danger">{props.error.message}</div>}
      <div className="search-results__wrapper" size="sm" bordered hover>
        {props.show &&
          !!props.results.length &&
          props.results.map((result, index) => (
            <SearchResultRow
              onClick={handleRowClick}
              selectBuildingResult={props.selectBuildingResult}
              key={`result-${index}`}
              result={result}
            />
          ))}
      </div>
    </div>
  )
}

SearchResults.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  selectBuildingResult: PropTypes.func,
  results: PropTypes.array,
  dispatch: PropTypes.func,
}

export default SearchResults

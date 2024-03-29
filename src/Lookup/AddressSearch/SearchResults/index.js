import React from 'react'
import PropTypes from 'prop-types'
import SearchResultRow from 'Lookup/AddressSearch/SearchResultRow'
import jQuery from 'jquery'
import './style.scss'

const SearchResults = props => {
  return (
    <div ref={props.searchResultsRef} className="search-results">
      <div className="search-results__wrapper" size="sm">
        {props.show && !!props.results.length && (
          <div>
            {!!props.results.length &&
              props.results.map((result, index) => (
                <SearchResultRow
                  currentResultFocusRef={index === props.resultFocusIndex ? props.currentResultFocusRef : null}
                  onClick={props.handleRowClick}
                  selectBuildingResult={props.selectBuildingResult}
                  key={`result-${index}`}
                  result={result}
                  onKeyDown={props.onKeyDown}
                  setResultFocusIndex={props.setResultFocusIndex}
                  resultIndex={index}
                />
              ))}

            {console.log("props.results.length:" + props.results.length)}
          </div>
        )}
      </div>
    </div>
  )
}

SearchResults.propTypes = {
  error: PropTypes.object,
  selectBuildingResult: PropTypes.func,
  results: PropTypes.array,
  dispatch: PropTypes.func,
  hideSearch: PropTypes.func,
  currentResultFocusRef: PropTypes.object,
  resultFocusIndex: PropTypes.number,
  setResultFocusIndex: PropTypes.func,
}

export default SearchResults

import React from 'react'
import PropTypes from 'prop-types'
import SearchResultRow from 'SearchModule/SearchResultRow'

import './style.scss'

const SearchResults = props => {
  return (
    <div className="search-results">
      {props.loading && <div>loading</div>}
      {props.results.map((result, index) => (
        <SearchResultRow selectBuildingResult={props.selectBuildingResult} key={`result-${index}`} result={result} />
      ))}
    </div>
  )
}

SearchResults.propTypes = {
  loading: PropTypes.bool,
  selectBuildingResult: PropTypes.func,
  results: PropTypes.array,
}

export default SearchResults

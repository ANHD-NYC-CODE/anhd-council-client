import React from 'react'
import PropTypes from 'prop-types'
import SearchResultRow from 'Lookup/AddressSearch/SearchResultRow'
import { setSearchValue } from 'Store/Search/actions'

import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'

import './style.scss'

const SearchResults = props => {
  const handleRowClick = (e, result) => {
    e.preventDefault()
    const searchString = `${result.buildingnumber ? result.buildingnumber.replace(/ /g, '') : ''} ${
      result.buildingstreet ? result.buildingstreet.trim() : result.propertyaddress.trim()
    }, ${result.borough.trim()}`

    props.dispatch(setSearchValue(searchString))
    props.hideSearch(e, true)
    props.dispatch(
      setLookupAndRequestsAndRedirect({
        bbl: result.bbl,
        bin: result.bin,
        requests: props.config.createLookupRequests(result.bbl, result.bin),
      })
    )
  }

  return (
    <div ref={props.searchResultsRef} className="search-results">
      {props.error && <div className="text-danger">{props.error.message}</div>}
      <div className="search-results__wrapper" size="sm">
        {props.show && !!props.results.length && (
          <div>
            {!!props.results.length &&
              props.results.map((result, index) => (
                <SearchResultRow
                  onClick={handleRowClick}
                  selectBuildingResult={props.selectBuildingResult}
                  key={`result-${index}`}
                  result={result}
                />
              ))}
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
}

export default SearchResults

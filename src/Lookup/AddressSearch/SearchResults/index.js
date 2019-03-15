import React from 'react'
import PropTypes from 'prop-types'
import SearchResultRow from 'Lookup/AddressSearch/SearchResultRow'

import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'

import './style.scss'
import { Table } from 'react-bootstrap'

const SearchResults = props => {
  const handleRowClick = (e, result) => {
    e.preventDefault()
    props.dispatch(setLookupAndRequestsAndRedirect({ bbl: result.bbl, bin: result.bin }))
  }

  return (
    <div>
      {props.loading && <div className="text-info">loading</div>}
      {props.error && <div className="text-danger">{props.error.message}</div>}
      <Table className="search-results" size="sm" bordered hover>
        <tbody>
          {!!props.results.length &&
            props.results.map((result, index) => (
              <SearchResultRow
                onClick={handleRowClick}
                selectBuildingResult={props.selectBuildingResult}
                key={`result-${index}`}
                result={result}
              />
            ))}
        </tbody>
      </Table>
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

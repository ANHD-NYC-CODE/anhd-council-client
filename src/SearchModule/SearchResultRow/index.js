import React from 'react'
import PropTypes from 'prop-types'
import MapMarkerIcon from '../../shared/styles/icons/MapMarkerIcon'

import './style.scss'

const SearchResultRow = props => {
  const onClick = () => {
    props.selectBuildingResult(props.result)
  }
  return (
    <div className="search-result-row" onClick={onClick}>
      <i>
        <MapMarkerIcon />
      </i>
      <div>{`${props.result.housenumber} ${props.result.street}, ${props.result.borough}`}</div>
    </div>
  )
}

SearchResultRow.propTypes = {
  selectBuildingResult: PropTypes.func,
  dispatch: PropTypes.func,
  result: PropTypes.object,
}

export default SearchResultRow

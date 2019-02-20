import React from 'react'
import PropTypes from 'prop-types'
import MapMarkerIcon from '../../shared/styles/icons/MapMarkerIcon'
import { Link } from 'react-router-dom'

import './style.scss'

const SearchResultRow = props => {
  return (
    <div className="search-result-row">
      <i>
        <MapMarkerIcon />
      </i>
      <Link to={`/buildings/${props.result.bin}`}>{`${props.result.housenumber} ${props.result.street}, ${
        props.result.borough
      }`}</Link>
    </div>
  )
}

SearchResultRow.propTypes = {
  selectBuildingResult: PropTypes.func,
  dispatch: PropTypes.func,
  result: PropTypes.object,
}

export default SearchResultRow

import React from 'react'
import PropTypes from 'prop-types'
import MapMarkerIcon from 'shared/styles/icons/MapMarkerIcon'
import BuildingIcon from 'shared/styles/icons/BuildingIcon'
import { addressResultToPath } from 'shared/utilities/routeUtils'

import './style.scss'

const SearchResultRow = props => {
  if (props.result.bin && !props.result.alternateaddress) {
    return (
      <div
        className="search-result-row"
        onClick={e => props.onClick(e, props.result)}
        to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
      >
        <span>
          <BuildingIcon />
        </span>
        <span>{`${props.result.buildingnumber} ${props.result.buildingstreet.trim()}, ${props.result.borough}`}</span>
      </div>
    )
  } else if (props.result.bin && props.result.alternateaddress) {
    return (
      <div
        className="search-result-row"
        onClick={e => props.onClick(e, props.result)}
        to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
      >
        <span>
          <BuildingIcon />
        </span>
        <span>{`${props.result.propertyaddress.trim()}, ${props.result.borough}`}</span>
      </div>
    )
  } else if (props.result.alternateaddress) {
    return (
      <div
        className="search-result-row"
        onClick={e => props.onClick(e, props.result)}
        to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
      >
        <span>
          <BuildingIcon />
        </span>
        <span>{`${props.result.propertyaddress.trim()}, ${props.result.borough}`}</span>
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

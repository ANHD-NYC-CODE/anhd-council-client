import React from 'react'
import PropTypes from 'prop-types'
import MapMarkerIcon from 'shared/styles/icons/MapMarkerIcon'
import BuildingIcon from 'shared/styles/icons/BuildingIcon'
import { addressResultToPath } from 'shared/utilities/routeUtils'
import { LinkContainer } from 'react-router-bootstrap'

import './style.scss'

const SearchResultRow = props => {
  if (props.result.bin && !props.result.alternateaddress) {
    return (
      <tr className="search-result-row">
        <td>
          <BuildingIcon />
        </td>
        <LinkContainer
          onClick={e => props.onClick(e, props.result)}
          to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
        >
          <td>{`${props.result.buildingnumber} ${props.result.buildingstreet}, ${props.result.borough}`}</td>
        </LinkContainer>
      </tr>
    )
  } else if (props.result.bin && props.result.alternateaddress) {
    return (
      <tr className="search-result-row">
        <td>
          <MapMarkerIcon />
          <BuildingIcon />
        </td>
        <LinkContainer
          onClick={e => props.onClick(e, props.result)}
          to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
        >
          <td>
            {`${props.result.propertyaddress}, ${props.result.borough}`}
            <br />
            {`Alt Address: ${props.result.buildingnumber} ${props.result.buildingstreet}, ${props.result.borough}`}
          </td>
        </LinkContainer>
      </tr>
    )
  } else if (props.result.alternateaddress) {
    return (
      <tr className="search-result-row">
        <td>
          <MapMarkerIcon />
        </td>
        <LinkContainer
          onClick={e => props.onClick(e, props.result)}
          to={addressResultToPath({ bbl: props.result.bbl, bin: props.result.bin })}
        >
          <td>{`Property address: ${props.result.propertyaddress} - ${props.result.borough}`}</td>
        </LinkContainer>
      </tr>
    )
  } else {
    return (
      <tr className="search-result-row">
        <td>No results.</td>
      </tr>
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

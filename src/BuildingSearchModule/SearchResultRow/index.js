import React from 'react'
import PropTypes from 'prop-types'
import MapMarkerIcon from '../../shared/styles/icons/MapMarkerIcon'
import { LinkContainer } from 'react-router-bootstrap'

import './style.scss'

const SearchResultRow = props => {
  if (props.result.street) {
    return (
      <tr className="search-result-row">
        <td>
          <MapMarkerIcon />
        </td>
        <LinkContainer to={`/buildings/${props.result.bin}`}>
          <td>{`${props.result.housenumber} ${props.result.street}, ${props.result.borough}`}</td>
        </LinkContainer>
      </tr>
    )
  } else {
    return (
      <tr className="search-result-row">
        <td>
          <MapMarkerIcon />
        </td>
        <td>
          {props.result.bbl} - {props.result.propertyaddress} - {props.result.propertyborough}
        </td>
      </tr>
    )
  }
}

SearchResultRow.propTypes = {
  selectBuildingResult: PropTypes.func,
  dispatch: PropTypes.func,
  result: PropTypes.object,
}

export default SearchResultRow

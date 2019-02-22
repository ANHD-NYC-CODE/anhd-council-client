import React from 'react'
import PropTypes from 'prop-types'
import MapMarkerIcon from '../../shared/styles/icons/MapMarkerIcon'
import { LinkContainer } from 'react-router-bootstrap'

import './style.scss'

const SearchResultRow = props => {
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
}

SearchResultRow.propTypes = {
  selectBuildingResult: PropTypes.func,
  dispatch: PropTypes.func,
  result: PropTypes.object,
}

export default SearchResultRow

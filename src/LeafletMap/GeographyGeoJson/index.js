import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'

const GeographyGeoJson = props => {
  const getGeographyColor = geography => {
    if (props.selectedId == geography.properties.id) return '#f7f8c6' // yellow
    if (props.clickedGeographyId == geography.properties.id) return '#dfcdd3'
    // crimson
    else return props.selectedType === 'COUNCIL' ? '#4c8ad8' : '#e74c2d' // blue | orange
  }

  const getFillOpacity = geography => {
    if (props.selectedId == geography.properties.id) return '0.7'
    if (props.clickedGeographyId == geography.properties.id) return '0.5'
    else return '0.3'
  }
  const getStyle = geography => {
    return {
      color: '#040404',
      weight: 1,
      opacity: 0.7,
      fillColor: getGeographyColor(geography),
      fillOpacity: getFillOpacity(geography),
      fill: true,
    }
  }
  return (
    <GeoJSON
      key={`geojson-${props.selectedType}`}
      className="geography-geojson"
      data={props.geographies.map(g => g.data)}
      style={g => getStyle(g)}
      onClick={props.onClick}
    />
  )
}

GeographyGeoJson.propTypes = {
  clickedGeographyId: PropTypes.number,
  changingGeographyType: PropTypes.string,
  geographies: PropTypes,
  onClick: PropTypes.func,
  selectedRef: PropTypes.object,
  selectedId: PropTypes.string,
  selectedType: PropTypes.string,
  setSelectedGeoData: PropTypes.func,
}

export default GeographyGeoJson

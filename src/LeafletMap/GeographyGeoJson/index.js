import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'

const GeographyGeoJson = props => {
  const getGeographyColor = geography => {
    const displayGeographyType = props.changingGeographyType || props.currentGeographyType
    if (props.currentGeographyId == geography.properties.id) return '#f7f8c6' // yellow
    if (props.changingGeographyId == geography.properties.id) return '#dfcdd3'
    // crimson
    else return displayGeographyType === 'COUNCIL' ? '#4c8ad8' : '#e74c2d' // blue | orange
  }

  const getFillOpacity = geography => {
    if (props.currentGeographyId == geography.properties.id) return '0.7'
    if (props.changingGeographyId == geography.properties.id) return '0.5'
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
      key={`geojson-${props.changingGeographyType}`}
      className="geography-geojson"
      data={props.geographies.map(g => g.data)}
      style={g => getStyle(g)}
      onClick={props.onClick}
    />
  )
}

GeographyGeoJson.propTypes = {
  changingGeographyType: PropTypes.string,
  changingGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  geographies: PropTypes.array,
  onClick: PropTypes.func,
  currentGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  currentGeographyType: PropTypes.string,
}

export default GeographyGeoJson

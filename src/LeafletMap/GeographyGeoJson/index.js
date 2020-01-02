import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'

const GeographyGeoJson = props => {
  const getGeographyColor = geography => {
    const displayGeographyType = props.changingGeographyType || props.currentGeographyType
    if (props.currentGeographyId == geography.properties.id) return '#f7f8c6' // yellow
    if (props.changingGeographyId == geography.properties.id) return 'white'
    // selecting
    else return getGeographyTypeColor(displayGeographyType)
  }

  const getGeographyTypeColor = geographyType => {
    switch (geographyType) {
      case 'COUNCIL':
        return '#4c8ad8' // blue
      case 'COMMUNITY':
        return '#f5862c' // orange
      case 'STATE_ASSEMBLY':
        return 'red' // pink
      case 'STATE_SENATE':
        return '#6f42c1' // purple
      case 'ZIPCODE':
        return '#b9b8b8' // gray-400
    }
  }

  const getFillOpacity = geography => {
    if (props.currentGeographyId == geography.properties.id) return '0.4'
    if (props.changingGeographyId == geography.properties.id) return '0.5'
    else return '0.1'
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
  if (!props.geographies.length) return null
  try {
    return (
      <GeoJSON
        key={`geojson-${props.changingGeographyType}`}
        className="geography-geojson"
        data={props.geographies.map(g => g.data)}
        style={g => getStyle(g)}
        onClick={props.onClick}
        ref={props.geoJsonRef}
      />
    )
  } catch (e) {
    return null
  }
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

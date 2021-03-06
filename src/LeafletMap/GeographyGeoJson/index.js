import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'

const GeographyGeoJson = props => {
  const getGeographyColor = geography => {
    if (props.currentGeographyId == geography.properties.id) return '#f7f8c6' // yellow
    if (props.changingGeographyId == geography.properties.id) return 'white'
    // selecting
    else return 'transparent'
  }

  const getFillOpacity = geography => {
    if (props.currentGeographyId == geography.properties.id) return '0.4'
    if (props.changingGeographyId == geography.properties.id) return '0.5'
    else return '0'
  }
  const getStyle = geography => {
    return {
      stroke: true,
      weight: 1,
      opacity: 1,
      color: '#FFF',
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
GeographyGeoJson.defaultProps = {
  geographies: [],
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

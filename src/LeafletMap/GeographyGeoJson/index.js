import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'

const GeographyGeoJson = props => {
  const getGeographyColor = type => {
    return type === 'COUNCIL' ? '#4c8ad8' : '#e74c2d'
  }
  const getStyle = (selected = false) => {
    return {
      color: '#11111',
      weight: 2,
      opacity: 1,
      fillColor: selected ? 'yellow' : getGeographyColor(props.selectedType),
      fill: true,
    }
  }

  return (
    <GeoJSON
      key={`geojson-${props.selectedType}`}
      className="geography-geojson"
      data={props.geographies.map(g => g.data)}
      style={g => getStyle(parseInt(g.properties.id) === parseInt(props.selectedId))}
      onClick={e => console.log(e)}
    />
  )
}

GeographyGeoJson.propTypes = {
  selectedRef: PropTypes.object,
  selectedId: PropTypes.string,
  geographies: PropTypes,
  selectedType: PropTypes.string,
}

export default GeographyGeoJson

import React from 'react'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
const iconMarkup = renderToStaticMarkup(<FontAwesomeIcon icon={faCircle} size="xs" />)

const MarkerIcon = divIcon({
  html: iconMarkup,
})

export { MarkerIcon }

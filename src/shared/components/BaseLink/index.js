import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const BaseLink = props => {
  const isExternal = () => {
    return props.href.match(/(http)/)
  }
  return isExternal() ? (
    <a {...props} href={props.href} target={props.target || '_blank'} rel="noopener noreferrer" style={props.style}>
      {props.text || props.children}
    </a>
  ) : (
    <Link {...props} to={props.href} style={props.style}>
      {props.text || props.children}
    </Link>
  )
}

BaseLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
}

export default BaseLink

import React from 'react'
import PropTypes from 'prop-types'
import LayoutContext from 'Layout/LayoutContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'react-bootstrap'
const PrintButton = props => {
  if (window.innerWidth < 768) return null
  return (
    <LayoutContext.Consumer>
      {layout => (
        <Button onClick={() => layout.togglePrint(props.title)}>
          <FontAwesomeIcon icon={faPrint} />
          <span> Print</span>
        </Button>
      )}
    </LayoutContext.Consumer>
  )
}

PrintButton.propTypes = {
  title: PropTypes.string,
}

export default PrintButton

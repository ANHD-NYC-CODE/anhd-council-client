import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import classnames from 'classnames'
import './style.scss'

class CsvButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick()
    this.props.csvProps.onExport()
  }

  render() {
    return (
      <Button
        size={this.props.size}
        variant="dark"
        className={classnames('csv-button')}
        onClick={this.handleClick}
        // {...this.props.csvProps}
      >
        Export CSV
        <FontAwesomeIcon icon={faFileCsv} />
      </Button>
    )
  }
}

CsvButton.defaultProps = {
  error: null,
  loading: false,
  size: 'sm',
}

CsvButton.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  ExportCSVButton: PropTypes.func,
  csvProps: PropTypes.object,
  size: PropTypes.string,
}

export default CsvButton

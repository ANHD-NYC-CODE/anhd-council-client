import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
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
      <this.props.ExportCSVButton
        className={classnames('link-button csv-button')}
        onClick={this.handleClick}
        {...this.props.csvProps}
      >
        <FontAwesomeIcon icon={faFileCsv} />
        Export CSV
      </this.props.ExportCSVButton>
    )
  }
}

CsvButton.defaultProps = {
  error: null,
  loading: false,
}

CsvButton.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  ExportCSVButton: PropTypes.func,
  csvProps: PropTypes.object,
}

export default CsvButton

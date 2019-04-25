import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeCsvRequest } from 'Store/Request/actions'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

import './style.scss'

class CsvButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button
        className={classnames('link-button csv-button', this.props.className, { 'text-danger': this.props.error })}
        disabled={this.props.loading}
        onClick={
          this.props.onClick
            ? this.props.onClick
            : e => {
                e.preventDefault()
                this.props.dispatch(makeCsvRequest(this.props.request))
              }
        }
      >
        {this.props.loading ? <SpinnerLoader size="25px" /> : <FontAwesomeIcon icon={faFileCsv} />}
        <span>Csv</span>
      </button>
    )
  }
}

CsvButton.propTypes = {
  error: null,
  loading: false,
  onClick: PropTypes.func,
  request: {},
}

const mapStateToProps = (state, props) => {
  if (!props.request) return null
  console.log(props.request.csvRequestConstant)
  const loadingSelector = createLoadingSelector([props.request.csvRequestConstant])
  const errorSelector = createErrorSelector([props.request.csvRequestConstant])

  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(CsvButton)

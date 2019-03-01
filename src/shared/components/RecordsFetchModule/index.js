import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import resolvePath from 'object-resolve-path'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { resourceRouteChanged } from 'shared/utilities/routeUtils'

class RecordsFetchModule extends React.Component {
  constructor(props) {
    super(props)

    this.getRecords = this.getRecords.bind(this)

    this.getRecords(props)
  }

  componentWillReceiveProps(nextProps) {
    this.getRecords(nextProps)
  }

  getRecords(props) {
    if (!(props.loading || props.error || props.records) || resourceRouteChanged(this.props, props)) {
      props.dispatch(requestWithAuth(props.recordsFetch(props.dataset, props.id, props.urlParams, props.actionKey)))
    }
  }

  render() {
    return (
      <div className="records-fetch-module">
        {this.props.render(this.props.title, this.props.records, this.props.loading, this.props.error)}
      </div>
    )
  }
}

RecordsFetchModule.propTypes = {
  dataset: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  id: PropTypes.string,
  records: PropTypes.array,
  recordsFetch: PropTypes.func,
  reducerPath: PropTypes.string,
  title: PropTypes.string,
  urlParams: PropTypes.object,
}

const mapStateToProps = (state, props) => {
  const loadingSelector = createLoadingSelector([props.actionKey])
  const errorSelector = createErrorSelector([props.actionKey])

  let records = undefined
  try {
    records = resolvePath(state, `${props.reducerPath}.${props.actionKey}`)
  } catch (err) {
    return
  }

  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    records: records ? records : undefined,
  }
}

export default connect(mapStateToProps)(RecordsFetchModule)

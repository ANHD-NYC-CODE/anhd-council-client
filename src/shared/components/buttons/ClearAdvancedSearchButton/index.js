import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'
import { connect } from 'react-redux'

import { removeRequestType } from 'Store/AppState/actions'

class ClearAdvancedSearchButton extends React.Component {
  constructor(props) {
    super(props)

    this.clearAdvancedSearch = this.clearAdvancedSearch.bind(this)
  }

  clearAdvancedSearch(config) {
    config.clearAdvancedSearch()
    this.props.dispatch(removeRequestType('ADVANCED_SEARCH'))
  }

  render() {
    return (
      <ConfigContext.Consumer>
        {config => {
          return (
            <div className="clear-advanced-search-button" onClick={() => this.clearAdvancedSearch(config)}>
              {this.props.children}
            </div>
          )
        }}
      </ConfigContext.Consumer>
    )
  }
}

ClearAdvancedSearchButton.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    store: state,
  }
}

export default connect(mapStateToProps)(ClearAdvancedSearchButton)

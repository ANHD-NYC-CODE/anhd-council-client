import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'

import Condition from 'AdvancedSearch/Condition'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <h1>Advanced Search</h1>
        <AdvancedSearchSentence conditions={this.props.advancedSearch.conditions} />
        <Condition
          conditions={this.props.advancedSearch.conditions}
          condition={this.props.advancedSearch.conditions[0]}
          dispatch={this.props.dispatch}
          key={'condition-0'}
          index={0}
        />
      </Layout>
    )
  }
}

AdvancedSearch.propTypes = {
  advancedSearch: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    advancedSearch: state.advancedSearch,
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

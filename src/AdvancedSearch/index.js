import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'

import Condition from 'AdvancedSearch/Condition'
import { addNewCondition, removeLastCondition } from 'Store/AdvancedSearch/actions'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <h1>Advanced Search</h1>
        <button onClick={() => this.props.dispatch(addNewCondition())}>Add Condition</button>
        <button onClick={() => this.props.dispatch(removeLastCondition())}>Remove Condition</button>

        {this.props.advancedSearch.conditions.map((condition, index) => {
          return (
            <Condition condition={condition} dispatch={this.props.dispatch} key={`condition-${index}`} index={index} />
          )
        })}
      </Layout>
    )
  }
}

AdvancedSearch.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    advancedSearch: state.advancedSearch,
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

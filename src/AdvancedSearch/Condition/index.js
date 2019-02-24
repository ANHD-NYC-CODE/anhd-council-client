import React from 'react'
import PropTypes from 'prop-types'

class Condition extends React.Component {
  constructor(props) {
    super(props)

    this.addNewFilter = this.addNewFilter.bind(this)
  }

  addNewFilter() {}
  removeFilter() {}

  render() {
    return (
      <div className="condition">
        <h1>{this.props.condition.type}</h1>
      </div>
    )
  }
}

Condition.propTypes = {
  condition: PropTypes.object,
  dispatch: PropTypes.func,
  index: PropTypes.number,
}

export default Condition

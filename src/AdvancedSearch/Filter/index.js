import React from 'react'
import PropTypes from 'prop-types'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.removeFilter = this.removeFilter.bind(this)
  }

  removeFilter() {
    this.props.removeFilter(this.props.index)
  }

  render() {
    return (
      <div className="filter">
        {this.props.filter.dataset.name}
        <button onClick={this.removeFilter}>Remove Filter</button>
      </div>
    )
  }
}

Filter.propTypes = {
  filter: PropTypes.object,
  index: PropTypes.number,
  removeFilter: PropTypes.func,
}

export default Filter

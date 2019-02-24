import React from 'react'
import PropTypes from 'prop-types'

class Filter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="filter">{this.props.filter.dataset.name}</div>
  }
}

Filter.propTypes = {
  filter: PropTypes.object,
}

export default Filter

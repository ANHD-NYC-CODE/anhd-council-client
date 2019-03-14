import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import { clearSearch } from 'Store/Search/actions'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'

import { GET_BUILDING_SEARCH } from 'shared/constants/actions'
import { handleClearErrors } from 'Store/Error/actions'

import './style.scss'

class AddressSearch extends React.Component {
  constructor(props) {
    super(props)

    this.selectBuildingResult = this.selectBuildingResult.bind(this)
    this.dispatchSelectedBuildingResult = this.dispatchSelectedBuildingResult.bind(this)
    this.clearSelectedSearch = this.clearSelectedSearch.bind(this)
    this.setSearchValue = this.setSearchValue.bind(this)

    this.state = {
      selectedResult: null,
      searchValue: '',
    }
  }

  setSearchValue(value) {
    if (!value) {
      this.props.dispatch(handleClearErrors(GET_BUILDING_SEARCH))
      this.props.dispatch(clearSearch())
    }
    this.setState({
      searchValue: value,
    })
  }

  clearSelectedSearch() {
    this.setState({ selectedResult: null })
    this.props.dispatch(clearSearch())
  }

  selectBuildingResult(result) {
    this.setState({ selectedResult: result })
    this.dispatchSelectedBuildingResult(result)
  }

  dispatchSelectedBuildingResult(result = null) {
    const selectedResult = result || this.state.selectedResult || this.props.search.results[0]
    if (!selectedResult) return
    this.setState({ selectedResult: selectedResult })
    this.props.dispatch(clearSearch())
  }

  render() {
    return (
      <div className="address-search">
        <SearchBar
          clearSelectedSearch={this.clearSelectedSearch}
          dispatch={this.props.dispatch}
          dispatchSelectedBuildingResult={this.dispatchSelectedBuildingResult}
          placeholder={this.props.placeholder}
          searchTimeout={this.props.search.searchTimeout}
          selectBuildingResult={this.selectBuildingResult}
          selectedResult={this.state.selectedResult}
          searchValue={this.state.searchValue}
          setSearchValue={this.setSearchValue}
        />
        <SearchResults
          dispatch={this.props.dispatch}
          loading={this.props.loading}
          error={this.props.error}
          selectBuildingResult={this.selectBuildingResult}
          results={this.props.search.results}
        />
      </div>
    )
  }
}

AddressSearch.propTypes = {
  setViewCoordinates: PropTypes.func,
  search: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
  placeholder: PropTypes.string,
}

const loadingSelector = createLoadingSelector([GET_BUILDING_SEARCH])
const errorSelector = createErrorSelector([GET_BUILDING_SEARCH])
const mapStateToProps = state => {
  return {
    search: state.search,
    loading: loadingSelector(state),
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(AddressSearch)

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

    this.dispatchSelectedBuildingResult = this.dispatchSelectedBuildingResult.bind(this)
    this.clearSelectedSearch = this.clearSelectedSearch.bind(this)
    this.setSearchValue = this.setSearchValue.bind(this)
    this.showSearch = this.showSearch.bind(this)
    this.hideSearch = this.hideSearch.bind(this)
    this.searchBarRef = React.createRef()
    this.searchResultsRef = React.createRef()
    this.addressRef = React.createRef()
    this.state = {
      show: false,
      selectedResult: null,
      searchValue: undefined,
    }
  }

  componentDidMount() {
    this.addressRef.current.addEventListener('focus', this.showSearch)
    this.searchBarRef.current.addEventListener('focus', this.showSearch)
    window.addEventListener('click', this.hideSearch)
  }

  componentWillUnmount() {
    this.addressRef.current.removeEventListener('focus', this.showSearch)
    this.searchBarRef.current.removeEventListener('focus', this.showSearch)
    window.removeEventListener('click', this.hideSearch)
  }

  hideSearch(e) {
    if (e.target.closest('.address-search')) return
    this.setState({
      show: false,
    })
  }

  showSearch() {
    this.setState({
      show: true,
    })
  }

  setSearchValue(value) {
    if (!value) {
      this.props.dispatch(handleClearErrors(GET_BUILDING_SEARCH))
      this.props.dispatch(clearSearch())
    }
    this.setState({
      searchValue: value,
      show: true,
    })
  }

  clearSelectedSearch() {
    this.setState({ selectedResult: null })
    this.props.dispatch(clearSearch())
  }

  dispatchSelectedBuildingResult(result = null) {
    const selectedResult = result || this.state.selectedResult || this.props.search.results[0]
    this.setState({
      show: false,
    })
    if (!selectedResult) return
    this.setState({ selectedResult: selectedResult })
    this.props.dispatch(clearSearch())
  }

  render() {
    return (
      <div className="address-search mb-2" ref={this.addressRef}>
        <SearchBar
          searchBarRef={this.searchBarRef}
          inputClass={this.props.inputClass}
          clearSelectedSearch={this.clearSelectedSearch}
          dispatch={this.props.dispatch}
          dispatchSelectedBuildingResult={this.dispatchSelectedBuildingResult}
          placeholder={this.props.placeholder}
          searchTimeout={this.props.search.searchTimeout}
          selectedResult={this.state.selectedResult}
          searchValue={this.state.searchValue || this.props.search.searchQuery}
          setSearchValue={this.setSearchValue}
        />
        <SearchResults
          dispatch={this.props.dispatch}
          loading={this.props.loading}
          error={this.props.error}
          searchResultsRef={this.searchResultsRef}
          show={this.state.show}
          results={this.props.search.results}
        />
      </div>
    )
  }
}

AddressSearch.defaultProps = {
  inputClass: '',
}

AddressSearch.propTypes = {
  inputClass: PropTypes.string,
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

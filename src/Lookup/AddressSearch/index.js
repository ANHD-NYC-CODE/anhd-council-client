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
import { setSearchValue } from 'Store/Search/actions'
import classnames from 'classnames'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { setAppState } from 'Store/AppState/actions'

import './style.scss'

class AddressSearch extends React.PureComponent {
  constructor(props) {
    super(props)

    this.clearSelectedSearch = this.clearSelectedSearch.bind(this)
    this.setSearchValue = this.setSearchValue.bind(this)
    this.showSearch = this.showSearch.bind(this)
    this.hideSearch = this.hideSearch.bind(this)
    this.setResultFocusIndex = this.setResultFocusIndex.bind(this)
    this.searchBarRef = React.createRef()
    this.searchResultsRef = React.createRef()
    this.addressRef = React.createRef()
    this.currentResultFocusRef = React.createRef()
    this.handleRowClick = this.handleRowClick.bind(this)
    this.state = {
      show: false,
      selectedResult: null,
      searchValue: '',
      resultFocusIndex: -1,
    }
  }

  componentDidMount() {
    this.addressRef.current.addEventListener('focus', this.showSearch)
    this.searchBarRef.current.addEventListener('focus', this.showSearch)

    window.addEventListener('click', this.hideSearch)
    window.addEventListener('touchstart', this.hideSearch)
  }

  componentDidUpdate() {
    if (this.currentResultFocusRef.current) {
      this.currentResultFocusRef.current.focus()
    } else if (!!this.state.show && this.state.resultFocusIndex < 0 && this.searchBarRef.current) {
      this.searchBarRef.current.focus()
    }
  }

  componentWillUnmount() {
    this.addressRef.current.removeEventListener('focus', this.showSearch)
    this.searchBarRef.current.removeEventListener('focus', this.showSearch)
    window.removeEventListener('click', this.hideSearch)
    window.removeEventListener('touchstart', this.hideSearch)
  }

  hideSearch(e, override = false) {
    if (!override && !!e.target.closest('.address-search')) return
    this.setState({
      show: false,
    })
  }

  showSearch() {
    if (!this.props.search.results.length) return
    this.setState({
      show: true,
    })
  }

  setResultFocusIndex(index) {
    if (this.state.resultFocusIndex === index) return
    this.setState({
      resultFocusIndex: index,
    })
  }

  onKeyDown = e => {
    if (e.keyCode === 38 || (e.shiftKey && e.keyCode == 9)) {
      // up || shift + tab
      if (!this.state.show) return this.props.handleBlur()

      e.stopPropagation()
      e.preventDefault()
      this.setState(prevState => ({
        resultFocusIndex: Math.max(prevState.resultFocusIndex - 1, -1),
      }))
    } else if (e.keyCode === 40 || e.keyCode == 9) {
      // if (!this.props.search.results.length) return
      if (!this.state.show) return this.props.handleBlur()

      // down || tab
      e.stopPropagation()
      e.preventDefault()
      this.setState(prevState => ({
        show: true,
        resultFocusIndex: Math.min(prevState.resultFocusIndex + 1, this.props.search.results.length - 1),
      }))
    } else if (!!this.state.show && this.state.resultFocusIndex >= 0 && e.keyCode === 13) {
      // enter
      if (this.state.resultFocusIndex === -1) return
      this.handleRowClick(e, this.props.search.results[this.state.resultFocusIndex])
    } else if (!!this.state.show && this.state.resultFocusIndex >= 0 && e.keyCode === 32) {
      // space
      this.handleRowClick(e, this.props.search.results[this.state.resultFocusIndex])
    } else if (e.keyCode === 27) {
      // esc
      this.hideSearch(e, true)
    }
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

  handleRowClick(e, result) {
    e.preventDefault()
    const searchString = `${result.number ? result.number : ''} ${
      result.street ? result.street.trim() : ''
    }, ${result.borough.trim()}`

    this.props.dispatch(setSearchValue(searchString))
    this.hideSearch(e, true)
    this.props.dispatch(setAppState({ linkLookupBackToDashboard: false }))
    this.props.dispatch(
      setLookupAndRequestsAndRedirect({
        bbl: result.bbl,
        bin: result.bin,
        requests: this.props.config.createLookupRequests(result.bbl, result.bin),
      })
    )
  }

  render() {
    // prevents component from flipping from uncontrolled to controlled
    let { searchValue } = this.state
    if (!searchValue && typeof this.props.search.searchQuery !== 'undefined') {
      searchValue = this.props.search.searchQuery
    }

    return (
      <div className={classnames('address-search', this.props.containerClass)} ref={this.addressRef}>
        <SearchBar
          onKeyDown={this.onKeyDown}
          loading={this.props.loading}
          searchBarRef={this.searchBarRef}
          inputClass={this.props.inputClass}
          inputSize={this.props.inputSize}
          clearSelectedSearch={this.clearSelectedSearch}
          dispatch={this.props.dispatch}
          placeholder={this.props.placeholder}
          searchTimeout={this.props.search.searchTimeout}
          selectedResult={this.state.selectedResult}
          searchValue={searchValue}
          setSearchValue={this.setSearchValue}
          hideSearch={this.hideSearch}
        />

        <SearchResults
          config={this.props.config}
          dispatch={this.props.dispatch}
          error={this.props.error}
          searchResultsRef={this.searchResultsRef}
          currentResultFocusRef={this.currentResultFocusRef}
          show={!!this.props.search.results.length}
          hideSearch={this.hideSearch}
          results={this.props.search.results}
          resultFocusIndex={this.state.resultFocusIndex}
          onKeyDown={this.onKeyDown}
          handleRowClick={this.handleRowClick}
          setResultFocusIndex={this.setResultFocusIndex}
        />
      </div>
    )
  }
}

AddressSearch.defaultProps = {
  inputClass: '',
  inputSize: 'lg',
  containerClass: '',
}

AddressSearch.propTypes = {
  inputClass: PropTypes.string,
  inputSize: PropTypes.string,
  containerClass: PropTypes.string,
  config: PropTypes.object,
  setViewCoordinates: PropTypes.func,
  search: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
  placeholder: PropTypes.string,
  handleBlur: PropTypes.func,
}

const loadingSelector = createLoadingSelector([GET_BUILDING_SEARCH])
const errorSelector = createErrorSelector([GET_BUILDING_SEARCH])
const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentProperty: state.appState.currentProperty,
    currentBuilding: state.appState.currentBuilding,
    search: state.search,
    loading: loadingSelector(state),
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(AddressSearch)

import React from 'react'
import PropTypes from 'prop-types'
import { setSearchTimeout, queryAddress } from 'Store/Search/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { Form } from 'react-bootstrap'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import classnames from 'classnames'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import './style.scss'

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.dispatchQuery = this.dispatchQuery.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedResult) {
      this.props.setSearchValue(
        `${nextProps.selectedResult.housenumber} ${nextProps.selectedResult.street}, ${
          nextProps.selectedResult.boroughName
        }`
      )
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.dispatchSelectedBuildingResult()
  }

  dispatchQuery(value) {
    this.props.dispatch(requestWithAuth(queryAddress(value)))
  }

  onInputChange(e) {
    e = new StandardizedInput(e)
    this.props.clearSelectedSearch()

    this.props.setSearchValue(e.value)
    clearTimeout(this.props.searchTimeout)
    if (e.value) {
      this.props.dispatch(setSearchTimeout(setTimeout(this.dispatchQuery, 250, e.value)))
    }
  }

  render() {
    return (
      <div className="search-bar" onSubmit={this.onFormSubmit}>
        <Form.Control
          className={classnames(this.props.inputClass, { valued: !!this.props.searchValue })}
          name="address-search"
          ref={this.props.searchBarRef}
          onChange={this.onInputChange}
          size="lg"
          placeholder={this.props.placeholder || 'Type an address to search'}
          tabIndex={0}
          type="text"
          value={this.props.searchValue}
        />
        {this.props.show && (
          <div className="search-bar__close" onClick={e => this.props.hideSearch(e, true)}>
            <FontAwesomeIcon className="text-warning" size="lg" icon={faTimesCircle} />
          </div>
        )}
        <div className="search-bar__loading">{this.props.loading && <SpinnerLoader size="40px" />}</div>
      </div>
    )
  }
}

SearchBar.defaultProps = {
  inputClass: '',
}

SearchBar.propTypes = {
  clearSelectedSearch: PropTypes.func,
  dispatch: PropTypes.func,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  searchTimeout: PropTypes.number,
  selectBuildingResult: PropTypes.func,
  selectedResult: PropTypes.object,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
}

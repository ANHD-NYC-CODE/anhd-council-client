import React from 'react'
import PropTypes from 'prop-types'
import { setSearchTimeout, queryAddress } from 'Store/Search/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { Form } from 'react-bootstrap'
import StandardizedInput from 'shared/classes/StandardizedInput'
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
        `${nextProps.selectedResult.housenumber.trim()} ${nextProps.selectedResult.street.trim()}, ${nextProps.selectedResult.boroughName.trim()}`
      )
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
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
      <Form autoComplete="off" className="search-bar" onSubmit={this.onFormSubmit}>
        <Form.Control
          className={classnames(this.props.inputClass, { valued: !!this.props.searchValue })}
          name="address-search"
          ref={this.props.searchBarRef}
          onChange={this.onInputChange}
          onKeyDown={this.props.onKeyDown}
          size="lg"
          placeholder={this.props.searchValue || this.props.placeholder || 'Enter an address'}
          tabIndex={0}
          type="text"
        />
        {this.props.show && (
          <div className="search-bar__close" onClick={e => this.props.hideSearch(e, true)}>
            <FontAwesomeIcon className="text-secondary" size="lg" icon={faTimesCircle} />
          </div>
        )}
        <div className="search-bar__loading">{this.props.loading && <SpinnerLoader size="40px" />}</div>
      </Form>
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
  setSearchValue: PropTypes.func,
  selectedResult: PropTypes.object,
  searchValue: PropTypes.string,
  onKeyDown: PropTypes.func,
}

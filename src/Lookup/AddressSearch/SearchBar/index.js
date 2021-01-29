import React from 'react'
import PropTypes from 'prop-types'
import { setSearchTimeout, queryAddress } from 'Store/Search/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { Form, InputGroup, Button } from 'react-bootstrap'
import StandardizedInput from 'shared/classes/StandardizedInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import classnames from 'classnames'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

import './style.scss'

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.dispatchQuery = this.dispatchQuery.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  onSearchClick() {
    this.props.clearSelectedSearch()
    this.props.setSearchValue(this.props.searchValue)
    clearTimeout(this.props.searchTimeout)
    if (this.props.searchValue) {
      this.props.dispatch(setSearchTimeout(setTimeout(this.dispatchQuery, 250, this.props.searchValue)))
    }
  }

  render() {
    return (
      <Form autoComplete="off" className="search-bar" onSubmit={this.onFormSubmit}>
        <InputGroup>
          <Form.Control
            className={classnames(this.props.inputClass, { valued: !!this.props.searchValue })}
            name="address-search"
            ref={this.props.searchBarRef}
            onChange={this.onInputChange}
            onKeyDown={this.props.onKeyDown}
            size={this.props.inputSize}
            placeholder={this.props.searchValue || this.props.placeholder || 'Enter an address'}
            tabIndex={0}
            type="text"
            value={this.props.searchValue}
          />
          {/* {this.props.show && (
            <div
              className="search-bar__close"
              tabIndex="-1"
              role="button"
              onKeyDown={e => spaceEnterKeyDownHandler(e, e => this.props.hideSearch(e, true))}
              onClick={e => this.props.hideSearch(e, true)}
            >
              <FontAwesomeIcon className="text-secondary" size="lg" icon={faTimesCircle} />
            </div>
          )} */}
          {// only include button on legacy config
          this.props.inputClass !== 'xl-form-control' && (
            <InputGroup.Append className="input-group__label">
              <Button onClick={this.onSearchClick} variant="dark">
                Search
              </Button>
            </InputGroup.Append>
          )}
        </InputGroup>
        <div className="search-bar__loading">{this.props.loading && <SpinnerLoader size="25px" />}</div>
      </Form>
    )
  }
}

SearchBar.defaultProps = {
  inputClass: '',
  inputSize: 'lg',
}

SearchBar.propTypes = {
  clearSelectedSearch: PropTypes.func,
  dispatch: PropTypes.func,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  inputSize: PropTypes.string,
  searchTimeout: PropTypes.number,
  setSearchValue: PropTypes.func,
  selectedResult: PropTypes.object,
  searchValue: PropTypes.string,
  onKeyDown: PropTypes.func,
}

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { setSearchTimeout, queryAddress } from 'Store/Search/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { Form, InputGroup, Button } from 'react-bootstrap'
import StandardizedInput from 'shared/classes/StandardizedInput'
import classnames from 'classnames'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

import './style.scss'

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.debouncedQuery = _.debounce(this.dispatchQuery, 1000)
  }

  componentDidUpdate() {
    if (this.props.selectedResult) {
      this.props.setSearchValue(
        `${this.props.selectedResult.housenumber.trim()} ${this.props.selectedResult.street.trim()}, ${this.props.selectedResult.boroughName.trim()}`
      )
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
  }

  onSearchClick() {
    this.props.clearSelectedSearch()
    if (this.props.searchValue) {
      this.dispatchQuery()
    }
  }

  async dispatchQuery() {
    const { dispatch, searchValue } = this.props
    return dispatch(requestWithAuth(queryAddress(searchValue)))
  }

  onChange(ev) {
    const { value } = ev.currentTarget
    this.props.setSearchValue(value)
    this.debouncedQuery()
  }

  render() {
    return (
      <Form autoComplete="off" className="search-bar" onSubmit={this.onFormSubmit}>
        <InputGroup>
          <Form.Control
            className={classnames(this.props.inputClass, { valued: !!this.props.searchValue })}
            name="address-search"
            ref={this.props.searchBarRef}
            onChange={this.onChange}
            onKeyDown={this.props.onKeyDown}
            size={this.props.inputSize}
            placeholder={this.props.searchValue || this.props.placeholder || 'Enter an address'}
            tabIndex={0}
            type="text"
            value={this.props.searchValue}
          />
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

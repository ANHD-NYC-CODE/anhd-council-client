import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddressSearch from 'Lookup/AddressSearch'
import ConfigContext from 'Config/ConfigContext'
import { Button } from 'react-bootstrap'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

import './style.scss'

class LookupAddressDisplay extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
    }

    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.handleBlur)
    window.addEventListener('touchstart', this.handleBlur)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleBlur)
    window.removeEventListener('touchstart', this.handleBlur)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleEditClick(e) {
    e.preventDefault()
    this.setState(oldState => ({
      isEditing: true,
    }))
  }

  handleClear(e) {
    e.preventDefault()
    this.props.handleClear()
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      // esc
      this.handleBlur(e)
    }
  }

  handleBlur(e) {
    // ignore edit-button or address bar click
    if (
      e &&
      (e.target.classList.contains('lookup-address-display__edit-button') ||
        e.target.closest('.lookup-address-display__displaying') ||
        e.target.closest('.lookup-address-display__editing'))
    )
      return

    this.setState({
      isEditing: false,
    })
  }

  render() {
    return (
      <div className="lookup-address-display">
        {this.state.isEditing && (
          <div className="lookup-address-display__editing">
            <ConfigContext.Consumer>
              {config => {
                return (
                  <AddressSearch
                    config={config}
                    inputClass="home-search-bar"
                    inputSize="md"
                    containerClass="lookup-address-search"
                    handleBlur={this.handleBlur}
                  />
                )
              }}
            </ConfigContext.Consumer>
            {/* <button
              href="#"
              className="lookup-address-display__button lookup-address-display__cancel-button text-button--default"
              onClick={handleEditClick}
            >
              cancel
            </button> */}
          </div>
        )}
        {!this.state.isEditing && (
          <div className="lookup-address-display__displaying">
            {/* <Button
              className="lookup-address-display__button lookup-address-display__search-button btn--small"
              variant="dark"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon color="white" className="" size="2x" icon={faSearch} />
            </Button> */}
            <div
              tabIndex="0"
              role="button"
              className="lookup-address-display__title"
              onKeyDown={e => spaceEnterKeyDownHandler(e => this.handleEditClick(e))}
              onClick={this.handleEditClick}
            >
              {constructAddressString({
                street: this.props.profile.address,
                borough: boroCodeToName(this.props.profile.borough),
                zip: this.props.profile.zipcode,
              })}
              <Button
                className="lookup-address-display__button lookup-address-display__edit-button"
                onClick={this.handleEditClick}
                variant="dark"
                size="sm"
              >
                EDIT
              </Button>
              <Button
                className="lookup-address-display__button lookup-address-display__clear-button"
                onClick={this.handleClear}
                variant="dark"
                size="sm"
              >
                CLEAR
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

LookupAddressDisplay.propTypes = {
  profile: PropTypes.object,
  handleClear: PropTypes.func,
}

export default LookupAddressDisplay

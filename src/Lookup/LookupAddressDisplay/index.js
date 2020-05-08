import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddressSearch from 'Lookup/AddressSearch'
import ConfigContext from 'Config/ConfigContext'
import { Button } from 'react-bootstrap'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

import './style.scss'

const LookupAddressDisplay = props => {
  const [isEditing, toggleEditing] = useState(false)

  const handleEditClick = e => {
    e.preventDefault()
    toggleEditing(!isEditing)
  }

  const handleClear = e => {
    e.preventDefault()
    props.handleClear()
  }

  const handleBlur = () => {
    toggleEditing(false)
  }

  return (
    <div className="lookup-address-display">
      {isEditing && (
        <div className="lookup-address-display__editing">
          <ConfigContext.Consumer>
            {config => {
              return (
                <AddressSearch
                  config={config}
                  inputClass="home-search-bar"
                  inputSize="md"
                  containerClass="lookup-address-search"
                  handleBlur={handleBlur}
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
      {!isEditing && (
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
            onKeyDown={e => spaceEnterKeyDownHandler(e => handleEditClick(e))}
            onClick={handleEditClick}
          >
            {constructAddressString({
              street: props.profile.address,
              borough: boroCodeToName(props.profile.borough),
              zip: props.profile.zipcode,
            })}
            <Button
              className="lookup-address-display__button lookup-address-display__edit-button"
              onClick={handleEditClick}
              variant="dark"
              size="sm"
            >
              EDIT
            </Button>
            <Button
              className="lookup-address-display__button lookup-address-display__clear-button"
              onClick={handleClear}
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

LookupAddressDisplay.propTypes = {
  profile: PropTypes.object,
  handleClear: PropTypes.func,
}

export default LookupAddressDisplay

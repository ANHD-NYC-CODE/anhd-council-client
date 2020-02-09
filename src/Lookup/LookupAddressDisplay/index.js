import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddressSearch from 'Lookup/AddressSearch'
import ConfigContext from 'Config/ConfigContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'

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
                  containerClass="lookup-address-search mr-2"
                />
              )
            }}
          </ConfigContext.Consumer>
          <button
            href="#"
            className="lookup-address-display__button lookup-address-display__cancel-button text-button--default"
            onClick={handleEditClick}
          >
            cancel
          </button>
        </div>
      )}
      {!isEditing && (
        <div className="lookup-address-display__displaying">
          <Button
            className="lookup-address-display__button lookup-address-display__search-button btn--small"
            variant="dark"
            onClick={handleEditClick}
          >
            <FontAwesomeIcon color="white" className="" size="2x" icon={faSearch} />
          </Button>
          <p className="lookup-address-display__title">
            {constructAddressString({
              street: props.profile.address,
              borough: boroCodeToName(props.profile.borough),
              zip: props.profile.zipcode,
            })}
            <Button
              className="lookup-address-display__button lookup-address-display__edit-button"
              onClick={handleEditClick}
              variant="dark"
            >
              EDIT
            </Button>
            <Button
              className="lookup-address-display__button lookup-address-display__clear-button"
              onClick={handleClear}
              variant="dark"
            >
              CLEAR
            </Button>
          </p>
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

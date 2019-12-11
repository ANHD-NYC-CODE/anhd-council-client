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
          <a href="#" className="lookup-address-display__cancel-button text-link" onClick={handleEditClick}>
            cancel
          </a>
        </div>
      )}
      {!isEditing && (
        <div className="lookup-address-display__displaying">
          <Button className="lookup-address-display__search-button" variant="outline-dark" onClick={handleEditClick}>
            <FontAwesomeIcon className="" size="2x" icon={faSearch} />
          </Button>
          <h5 className="lookup-address-display__title">
            Tax Lot Address:{' '}
            {constructAddressString({
              street: props.profile.address,
              borough: boroCodeToName(props.profile.borough),
              zip: props.profile.zipcode,
            })}
            <a href="#" className="lookup-address-display__edit-button text-link" onClick={handleEditClick}>
              edit
            </a>
          </h5>
        </div>
      )}
    </div>
  )
}

LookupAddressDisplay.propTypes = {
  profile: PropTypes.object,
}

export default LookupAddressDisplay

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './style.scss';

const SaveSearchButton = props => {
    return (
        <div className="save-search-button__container" onClick={props.onSave}>
            <FontAwesomeIcon 
                className={`save-search-button__icon_${props.active ? "active" : "inactive"}`}
                icon={faStar}
                size="lg"
            />
            { props.text && (<span className="ml-2">{props.active ? props.activeText || props.text : props.text}</span>) }
        </div>
    )
}

export default SaveSearchButton;
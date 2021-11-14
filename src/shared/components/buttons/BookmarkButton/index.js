import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import './style.scss';

const BookmarkButton = props => {
    return (
        <div className="bookmark-button__container" onClick={props.onBookmark}>
            <FontAwesomeIcon 
                className={`bookmark-button__icon_${props.active ? "active" : "inactive"}`}
                icon={faBookmark}
                size="lg"
            />
            { props.text && (<span>{props.active ? props.activeText || props.text : props.text}</span>) }
        </div>
    )
}

export default BookmarkButton;
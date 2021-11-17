import { constructAxiosPost, constructAxiosDelete, constructAxiosGet } from "shared/utilities/Axios";
import * as c from "../constants";
import * as u from "shared/constants/urls"

const handleBookmarkProperty = () => ({
    type: c.BOOKMARK_PROPERTY
})

const handleUnBookmarkProperty = () => ({
    type: c.UNBOOKMARK_PROPERTY
})

const handleGetUserBookmarkedProperties = (response) => ({
    type: c.GET_USER_BOOKMARKED_PROPERTIES,
    data: response.data,
})

export const bookmarkProperty = (bbl, name) => (dispatch, getState, access_token) => {
    const requestId = Math.floor(Math.random() * 1000000)

    return constructAxiosPost(
        dispatch,
        getState,
        requestId,
        u.BOOKMARKS_URL,
        {
            bbl, name
        },
        null,
        access_token,
        c.BOOKMARK_PROPERTY,
        handleBookmarkProperty
    )
} 

export const unBookmarkProperty = (id) => (dispatch, getState, access_token) => {
    const requestId = Math.floor(Math.random() * 1000000)

    return constructAxiosDelete(
        dispatch,
        getState,
        requestId,
        `${u.BOOKMARKS_URL}${id}`,
        null,
        null,
        access_token,
        c.UNBOOKMARK_PROPERTY,
        handleUnBookmarkProperty
    )
} 

export const getUserBookmarkedProperties = () =>  (dispatch, getState, access_token) => {
    const requestId = Math.floor(Math.random() * 1000000);
    
    return constructAxiosGet(
        dispatch,
        getState,
        requestId,
        u.BOOKMARKS_URL,
        null,
        access_token,
        c.GET_USER_BOOKMARKED_PROPERTIES,
        handleGetUserBookmarkedProperties
    )
}

export const clearUserBookmarkedProperties = () => ({
    type: c.CLEAR_USER_BOOKMARKED_PROPERTIES
})
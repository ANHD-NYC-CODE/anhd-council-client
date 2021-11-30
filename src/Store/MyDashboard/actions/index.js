import { 
    constructAxiosPost, 
    constructAxiosDelete, 
    constructAxiosGet, 
    constructAxiosPatch 
} from "shared/utilities/Axios";
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

const handleGetUserSavedCustomSearches = (response) => ({
    type: c.GET_USER_SAVED_CUSTOM_SEARCHES,
    data: response.data,
})

const handleSaveCustomSearch = () => ({
    type: c.SAVE_CUSTOM_SEARCH
})

const handleDeleteCustomSearch = () => ({
    type: c.DELETE_CUSTOM_SEARCH
})

const handleUpdateSavedCustomSearch = () => ({
    type: c.UPDATE_CUSTOM_SEARCH
})

export const clearMyDashboard = () => ({
    type: c.CLEAR_MY_DASHBOARD
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

export const getUserSavedCustomSearches = () => (dispatch, getState, access_token) => {
    const requestId = Math.floor(Math.random() * 1000000);

    return constructAxiosGet(
        dispatch,
        getState,
        requestId,
        u.CUSTOM_SEARCHES_URL,
        null,
        access_token,
        c.GET_USER_SAVED_CUSTOM_SEARCHES,
        handleGetUserSavedCustomSearches
    )
}

export const saveUserCustomSearch = (name, frequency, frontendUrl) => 
    (dispatch, getState, access_token) => 
{
    const requestId = Math.floor(Math.random() * 1000000);

    return constructAxiosPost(
        dispatch,
        getState,
        requestId,
        u.CUSTOM_SEARCHES_URL,
        {
            name, 
            notification_frequency: frequency,
            custom_search_view: frontendUrl
        },
        null,
        access_token,
        c.SAVE_CUSTOM_SEARCH,
        handleSaveCustomSearch
    )
}

export const deleteUserCustomSearch = (id) => (dispatch, getState, access_token) => {
    const requestId = Math.floor(Math.random() * 1000000);

    return constructAxiosDelete(
        dispatch,
        getState,
        requestId,
        `${u.CUSTOM_SEARCHES_URL}${id}`,
        null,
        null,
        access_token,
        c.DELETE_CUSTOM_SEARCH,
        handleDeleteCustomSearch
    )
}

export const updateSavedCustomSearch = (id, name, frequency) => 
    (dispatch, getState, access_token) => 
{
    const requestId = Math.floor(Math.random() * 1000000);

    return constructAxiosPatch(
        dispatch,
        getState,
        requestId,
        `${u.CUSTOM_SEARCHES_URL}${id}/`,
        {
            name, 
            notification_frequency: frequency
        },
        null,
        access_token,
        c.UPDATE_CUSTOM_SEARCH,
        handleSaveCustomSearch
    )
}
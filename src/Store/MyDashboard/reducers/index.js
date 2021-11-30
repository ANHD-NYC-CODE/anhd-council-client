import * as actions from "../actions"
import * as c from "../constants"

export const initialState = {
    userBookmarks: {},
    customSearches: {}
}

export const myDashboardReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
    switch (action.type) {
        case c.GET_USER_BOOKMARKED_PROPERTIES:
            let bookmarks = {};
            action.data.forEach(userBookmark => 
                bookmarks[userBookmark.bbl] = userBookmark
            );
            return {
                ...state,
                userBookmarks: bookmarks
            }
        case c.GET_USER_SAVED_CUSTOM_SEARCHES:
            let searches = {};
            action.data.forEach(search => 
                searches[search.custom_search_view] = search
            );
            return {
                ...state,
                customSearches: searches
            }
        case c.CLEAR_MY_DASHBOARD:
            return {
                ...state,
                userBookmarks: {},
                customSearches: {}
            }
        default: 
            return state
    }
}
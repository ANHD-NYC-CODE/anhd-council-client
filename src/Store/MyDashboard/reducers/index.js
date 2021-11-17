import * as actions from "../actions"
import * as c from "../constants"

export const initialState = {
    userBookmarks: {}
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
        case c.CLEAR_USER_BOOKMARKED_PROPERTIES:
            return {
                ...state,
                userBookmarks: {}
            }
        default: 
            return state
    }
}
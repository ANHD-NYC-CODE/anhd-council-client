import * as actions from '../actions'

export const initialState = {
    userBookmarks: {
        "2024590034": true
    }
}

export const myDashboardReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
    switch (action.type) {
        default:
            return state
    }
}
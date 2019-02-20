import * as actions from '../actions'

export const initialState = {
  type: undefined,
  modalProps: {},
}

export const modalReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case actions.HANDLE_MODAL_ACTION: {
      return {
        ...state,
        type: (action.data || {}).type,
        modalProps: (action.data || {}).modalProps,
      }
    }
    default:
      return state
  }
}

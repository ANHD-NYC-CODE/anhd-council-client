import * as reducer from 'Store/Auth/reducers'
import * as actions from 'Store/Auth/actions'
import moment from 'moment'

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.authReducer(undefined, {})).toEqual(reducer.initialState)
  })

  describe('HANDLE_SYNC_STORAGE', () => {
    const access_token = '1234'
    const refresh_token = 'abcd'
    it('saves the tokens and user', () => {
      const storage = {
        access: { token: access_token, expiration: moment().format() },
        refresh: { token: refresh_token, expiration: moment().format() },
        user: { id: 1 },
      }
      expect(reducer.authReducer(undefined, actions.handleSyncStorage(storage))).toEqual({
        ...reducer.initialState,
        access: storage.access,
        refresh: storage.refresh,
        user: storage.user,
      })
    })
  })

  describe('HANDLE_USER_LOGOUT', () => {
    it('clears the state', () => {
      expect(reducer.authReducer(undefined, actions.handleUserLogout())).toEqual({
        ...reducer.initialState,
      })
    })
  })
})

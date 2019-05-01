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
        refreshTimeout: 1,
        user: { id: 1 },
      }

      expect(reducer.authReducer(undefined, actions.handleSyncStorage(storage)).access).toEqual(storage.access)
      expect(reducer.authReducer(undefined, actions.handleSyncStorage(storage)).refresh).toEqual(storage.refresh)
      expect(reducer.authReducer(undefined, actions.handleSyncStorage(storage)).user).toEqual(storage.user)
      expect(reducer.authReducer(undefined, actions.handleSyncStorage(storage)).refreshTimeout).toBeDefined()
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

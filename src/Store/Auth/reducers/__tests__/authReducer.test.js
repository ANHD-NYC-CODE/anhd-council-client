import * as reducer from 'Store/Auth/reducers'
import * as actions from 'Store/Auth/actions'

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.authReducer(undefined, {})).toEqual(reducer.initialState)
  })

  describe('HANDLE_USER_LOGIN_SUCCESS', () => {
    const access_token = '1234'
    const refresh_token = 'abcd'
    it('saves the tokens', () => {
      expect(
        reducer.authReducer(
          undefined,
          actions.handleUserLogin({ data: { access_token: access_token, refresh_token: refresh_token } })
        )
      ).toEqual({
        ...reducer.initialState,
        access_token: access_token,
        refresh_token: refresh_token,
      })
    })
  })

  describe('HANDLE_GET_USER', () => {
    const user = { email: 'test@test.com' }
    it('saves the current user', () => {
      expect(reducer.authReducer(undefined, actions.handleGetUser({ data: user }))).toEqual({
        ...reducer.initialState,
        user: user,
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

import * as reducer from 'Store/Search/reducers'
import * as actions from 'Store/Search/actions'

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.searchReducer(undefined, {})).toEqual(reducer.initialState)
  })

  describe('HANDLE_ERROR_RESPONSE', () => {
    it('sets awaitingResponse to false', () => {
      const expectedState = { ...reducer.initialState, error: { status: 500, message: 'hello' } }
      expect(
        reducer.searchReducer(undefined, actions.handleErrorResponse({ status: 500, data: { results: 'hello' } }))
      ).toEqual(expectedState)
    })
  })

  describe('HANDLE_READ_X_RESPONSE', () => {
    const response = [{ bin: 1 }, { bin: 2 }]
    it('fetches the Search results', () => {
      expect(reducer.searchReducer(undefined, actions.handleReadSearchResponse({ data: response }))).toEqual({
        ...reducer.initialState,
        results: response,
      })
    })
  })
})

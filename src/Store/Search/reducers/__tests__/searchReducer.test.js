import * as reducer from 'Store/Search/reducers'
import * as actions from 'Store/Search/actions'

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.searchReducer(undefined, {})).toEqual(reducer.initialState)
  })

  describe('HANDLE_READ_X_RESPONSE', () => {
    const response = [{ bin: 1 }, { bin: 2 }]
    it('fetches the Search results', () => {
      expect(
        reducer.searchReducer(undefined, actions.handleReadSearchResponse({ data: response })).results.length
      ).toEqual(2)
    })
  })
})

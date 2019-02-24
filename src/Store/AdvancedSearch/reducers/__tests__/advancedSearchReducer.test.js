import * as r from '../'
import * as a from '../../actions'

describe('Advanced Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.advancedSearchReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('ADD_NEW_CONDITION', () => {
    const condition = { type: 'OR', filters: [] }
    it('adds to array, adds opposite type', () => {
      const state = {
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }],
          },
        ],
      }
      expect(r.advancedSearchReducer(state, a.addNewCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [state.conditions[0], condition],
      })
    })
  })

  describe('REMOVE_LAST_CONDITION', () => {
    const state = {
      conditions: [
        {
          type: 'AND',
          filters: [{ dataset: 1 }],
        },
      ],
    }
    const condition = state.conditions[0]
    it('replaces with the initial state', () => {
      expect(r.advancedSearchReducer(state, a.removeLastCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [r.initialState.conditions[0]],
      })
    })

    it('removes the last condition', () => {
      const state = {
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }],
          },
          {
            type: 'OR',
            filters: [{ dataset: 3 }, { dataset: 4 }],
          },
        ],
      }

      expect(r.advancedSearchReducer(state, a.removeLastCondition(condition))).toEqual({
        ...r.initialState,
        conditions: [
          {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }],
          },
        ],
      })
    })
  })

  describe('ADD_FILTER', () => {
    it('adds a filter', () => {
      const state = {
        conditions: [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }],
      }

      const expectedConditions = [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] }]
      const filter = { dataset: 3 }
      expect(r.advancedSearchReducer(state, a.addFilter(0, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('adds a filter 2', () => {
      const state = {
        conditions: [
          { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
          { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
        ],
      }

      const expectedConditions = [
        { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }, { dataset: 4 }] },
        { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
      ]
      const filter = { dataset: 4 }
      expect(r.advancedSearchReducer(state, a.addFilter(0, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })

  describe('REMOVE_FILTER', () => {
    it('removes a filter', () => {
      const state = {
        conditions: [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }],
      }

      const expectedConditions = [{ type: 'AND', filters: [{ dataset: 2 }] }]
      expect(r.advancedSearchReducer(state, a.removeFilter(0, 0))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('removes a filter 2', () => {
      const state = {
        conditions: [
          { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
          { type: 'AND', filters: [{ dataset: 3 }, { dataset: 4 }] },
        ],
      }

      const expectedConditions = [
        { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
        { type: 'AND', filters: [{ dataset: 3 }] },
      ]
      expect(r.advancedSearchReducer(state, a.removeFilter(1, 1))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })
})

describe('UPDATE_FILTER', () => {
  it('updates a filter', () => {
    const state = {
      conditions: [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] }],
    }

    const expectedConditions = [{ type: 'AND', filters: [{ dataset: 1 }, { dataset: 3 }] }]
    expect(r.advancedSearchReducer(state, a.updateFilter(0, 1, { dataset: 3 }))).toEqual({
      ...r.initialState,
      conditions: expectedConditions,
    })
  })
})

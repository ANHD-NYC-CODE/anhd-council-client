import * as r from '../'
import * as a from '../../actions'

describe('Advanced Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.advancedSearchReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('ADD_NEW_CONDITION', () => {
    const conditionId = '1'
    const condition1 = { type: 'OR', filters: [] }
    it('adds to condition array, adds opposite type, adds condition filter at end', () => {
      const state = {
        ...r.initialState,
        conditions: {
          '0': {
            type: 'AND',
            filters: [{ dataset: 1 }],
          },
        },
      }
      const condition0 = {
        type: 'AND',
        filters: [{ dataset: 1 }, { conditionGroup: conditionId }],
      }
      expect(r.advancedSearchReducer(state, a.addNewCondition('0', conditionId))).toEqual({
        ...r.initialState,
        conditions: { '0': condition0, '1': condition1 },
      })
    })
  })

  describe('REMOVE_CONDITION', () => {
    const state = {
      ...r.initialState,
      conditions: {
        '0': {
          type: 'AND',
          filters: [{ dataset: 1 }],
        },
      },
      results: undefined,
    }
    const conditionId = '0'
    it('replaces with the initial state', () => {
      expect(r.advancedSearchReducer(state, a.removeCondition(conditionId))).toEqual({
        ...r.initialState,
        conditions: { ...r.initialState.conditions },
      })
    })

    it('removes the last condition', () => {
      const conditionId = '1'
      const state = {
        ...r.initialState,
        conditions: {
          '0': {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }, { conditionGroup: '1' }],
          },
          [conditionId]: {
            type: 'OR',
            filters: [{ dataset: 3 }, { dataset: 4 }],
          },
        },
      }

      expect(r.advancedSearchReducer(state, a.removeCondition(conditionId))).toEqual({
        ...r.initialState,
        conditions: {
          '0': {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }],
          },
        },
      })
    })
  })

  describe('ADD_FILTER', () => {
    it('adds a filter', () => {
      const state = {
        ...r.initialState,
        conditions: { '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] } },
      }

      const expectedConditions = { '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] } }
      const filter = { dataset: 3 }
      expect(r.advancedSearchReducer(state, a.addFilter('0', filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('adds a filter, keeps condition groups at the end', () => {
      const state = {
        ...r.initialState,
        conditions: {
          '0': {
            type: 'AND',
            filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }, { conditionGroup: '1' }, { conditionGroup: '2' }],
          },
          '1': { type: 'OR', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
          '2': { type: 'OR', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
        },
      }

      const expectedConditions = {
        '0': {
          type: 'AND',
          filters: [
            { dataset: 1 },
            { dataset: 2 },
            { dataset: 3 },
            { dataset: 4 },
            { conditionGroup: '1' },
            { conditionGroup: '2' },
          ],
        },
        '1': { type: 'OR', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
        '2': { type: 'OR', filters: [{ dataset: 1 }, { dataset: 2 }, { dataset: 3 }] },
      }
      const filter = { dataset: 4 }
      expect(r.advancedSearchReducer(state, a.addFilter(0, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('adds a filter 3', () => {
      const state = {
        ...r.initialState,
        conditions: {
          '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
          '1': { type: 'OR', filters: [{ dataset: 3 }, { dataset: 4 }] },
          '2': { type: 'AND', filters: [{ dataset: 6 }, { dataset: 7 }] },
        },
      }

      const expectedConditions = {
        '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
        '1': { type: 'OR', filters: [{ dataset: 3 }, { dataset: 4 }, { dataset: 5 }] },
        '2': { type: 'AND', filters: [{ dataset: 6 }, { dataset: 7 }] },
      }
      const filter = { dataset: 5 }
      expect(r.advancedSearchReducer(state, a.addFilter(1, filter))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })

  describe('UPDATE_FILTER', () => {
    it('updates a filter', () => {
      const state = {
        ...r.initialState,
        conditions: { '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] } },
      }

      const expectedConditions = { '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 3 }] } }
      expect(r.advancedSearchReducer(state, a.updateFilter(0, 1, { dataset: 3 }))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })

  describe('REMOVE_FILTER', () => {
    it('removes a filter', () => {
      const state = {
        ...r.initialState,
        conditions: { '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] } },
      }

      const expectedConditions = { '0': { type: 'AND', filters: [{ dataset: 2 }] } }
      expect(r.advancedSearchReducer(state, a.removeFilter(0, 0))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })

    it('removes a filter 2', () => {
      const state = {
        ...r.initialState,
        conditions: {
          '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
          '1': { type: 'AND', filters: [{ dataset: 3 }, { dataset: 4 }] },
        },
      }

      const expectedConditions = {
        '0': { type: 'AND', filters: [{ dataset: 1 }, { dataset: 2 }] },
        '1': { type: 'AND', filters: [{ dataset: 3 }] },
      }
      expect(r.advancedSearchReducer(state, a.removeFilter(1, 1))).toEqual({
        ...r.initialState,
        conditions: expectedConditions,
      })
    })
  })

  describe('ADD_BOUNDARY', () => {
    it('adds a boundaries', () => {
      const state = {
        ...r.initialState,
      }

      const expectedBoundaries = [{ council: 1 }]

      const boundary = { council: 1 }
      expect(r.advancedSearchReducer(state, a.addBoundary(boundary))).toEqual({
        ...r.initialState,
        boundaries: expectedBoundaries,
      })
    })
  })

  describe('UPDATE_BOUNDARY', () => {
    it('updates a boundaries', () => {
      const state = {
        ...r.initialState,
        boundaries: [{ council: 1 }],
      }

      const updatedBoundary = { council: 2 }
      const expectedBoundaries = [updatedBoundary]

      expect(r.advancedSearchReducer(state, a.updateBoundary(0, updatedBoundary))).toEqual({
        ...r.initialState,
        boundaries: expectedBoundaries,
      })
    })
  })

  describe('REMOVE_BOUNDARY', () => {
    it('removes a boundaries', () => {
      const state = {
        ...r.initialState,
        boundaries: [{ council: 1 }],
      }

      const expectedBoundaries = []

      expect(r.advancedSearchReducer(state, a.removeBoundary('council'))).toEqual({
        ...r.initialState,
        boundaries: expectedBoundaries,
      })
    })
  })
})

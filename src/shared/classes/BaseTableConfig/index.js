import React from 'react'
import { textFilter } from 'react-bootstrap-table2-filter'
import classnames from 'classnames'
export default class BaseTableConfig {
  constructor({ component = undefined } = {}) {
    this._component = component
    this._filters = {}
    this._selectedFilters = {}
    this._filterPrototypes = {
      ...this.createFilterPrototype('HPD_VIOLATION_OPEN'),
      ...this.createFilterPrototype('HPD_VIOLATION_CLASS'),
      ...this.createFilterPrototype('HPD_COMPLAINT_OPEN', true),
      ...this.createFilterPrototype('DOB_VIOLATION_ACTIVE'),
      ...this.createFilterPrototype('DOB_COMPLAINT_ACTIVE'),
      ...this.createFilterPrototype('ECB_VIOLATION_ACTIVE'),
      ...this.createFilterPrototype('DOB_FILED_PERMIT_TYPE'),
      ...this.createFilterPrototype('DOB_ISSUED_PERMIT_TYPE'),
    }
    this._filterFunctions = {
      ...this.createFilterFunction('HPD_VIOLATION_OPEN'),
      ...this.createFilterFunction('HPD_VIOLATION_CLASS'),
      ...this.createFilterFunction('HPD_COMPLAINT_OPEN'),
      ...this.createFilterFunction('DOB_VIOLATION_ACTIVE'),
      ...this.createFilterFunction('DOB_COMPLAINT_ACTIVE'),
      ...this.createFilterFunction('ECB_VIOLATION_ACTIVE'),
      ...this.createFilterFunction('DOB_FILED_PERMIT_TYPE'),
      ...this.createFilterFunction('DOB_ISSUED_PERMIT_TYPE'),
    }
    this.filterButtonSets = {
      HPD_VIOLATION: [
        this.createFilterButtonSet(
          'HPD_VIOLATION',
          'HPD_VIOLATION_OPEN',
          [this.createFilterItem('Open', 'open')],
          'All'
        ),
        this.createFilterButtonSet(
          'HPD_VIOLATION',
          'HPD_VIOLATION_CLASS',
          [
            this.createFilterItem('Class A', 'A'),
            this.createFilterItem('Class B', 'B'),
            this.createFilterItem('Class C', 'C'),
          ],
          'All'
        ),
      ],
      HPD_COMPLAINT: [
        this.createFilterButtonSet(
          'HPD_COMPLAINT',
          'HPD_COMPLAINT_OPEN',
          [this.createFilterItem('Open', 'open')],
          'All'
        ),
      ],
      DOB_COMPLAINT: [
        this.createFilterButtonSet(
          'DOB_COMPLAINT',
          'DOB_COMPLAINT_ACTIVE',
          [this.createFilterItem('Active', 'active')],
          'All'
        ),
      ],

      DOB_VIOLATION: [
        this.createFilterButtonSet(
          'DOB_VIOLATION',
          'DOB_VIOLATION_ACTIVE',
          [this.createFilterItem('Active', 'active')],
          'All'
        ),
      ],
      ECB_VIOLATION: [
        this.createFilterButtonSet(
          'ECB_VIOLATION',
          'ECB_VIOLATION_ACTIVE',
          [this.createFilterItem('Active', 'active')],
          'All'
        ),
      ],
      DOB_FILED_PERMIT: [
        this.createFilterButtonSet(
          'DOB_FILED_PERMIT',
          'DOB_FILED_PERMIT_TYPE',
          [
            this.createFilterItem('A1', 'a1'),
            this.createFilterItem('A2', 'a2'),
            this.createFilterItem('A3', 'a3'),
            this.createFilterItem('NB', 'nb'),
            this.createFilterItem('DM', 'dm'),
          ],
          'All'
        ),
      ],
      DOB_ISSUED_PERMIT: [
        this.createFilterButtonSet(
          'DOB_ISSUED_PERMIT',
          'DOB_ISSUED_PERMIT_TYPE',
          [
            this.createFilterItem('A1', 'a1'),
            this.createFilterItem('A2', 'a2'),
            this.createFilterItem('A3', 'a3'),
            this.createFilterItem('NB', 'nb'),
            this.createFilterItem('DM', 'dm'),
          ],
          'All'
        ),
      ],
    }
  }

  get filters() {
    return this._filters
  }

  set filters(filters) {
    this._filters = filters
  }

  get filterPrototypes() {
    return this._filterPrototypes
  }

  set filterPrototypes(filterPrototypes) {
    this._filterPrototypes = filterPrototypes
  }

  get filterFunctions() {
    return this._filterFunctions
  }

  set filterFunctions(filterFunctions) {
    this._filterFunctions = filterFunctions
  }

  get selectedFilters() {
    return this._selectedFilters
  }

  set selectedFilters(selectedFilters) {
    this._selectedFilters = selectedFilters
  }

  get component() {
    return this._component
  }

  set component(component) {
    this._component = component
  }

  clearFilterGroup(filterConstant) {
    Object.keys(this.selectedFilters).map(key => {
      if (key.includes(filterConstant)) {
        this.filterFunctions[filterConstant](undefined, '')
        this.selectedFilters = { ...this.selectedFilters, [key]: '' }
      }
    })
  }

  createFilterPrototype(constant, forceUpdate = false) {
    return {
      [constant]: textFilter({
        getFilter: filter => {
          this.filters[constant] = filter
        },
        // onFilter: (filter, data) => {
        //   this.component.forceUpdate()
        // },
      }),
    }
  }

  createFilterFunction(constant) {
    return {
      [constant]: (e, value) => {
        this.filters[constant](value)
        if (value) {
          this.selectedFilters = { ...this.selectedFilters, [`${constant}__ ${value}`]: true }
        }
      },
    }
  }

  createFilterItem(label, value) {
    return { label, value }
  }

  createFilterButtonSet(resourceConstant, filterConstant, valuesArray, clearLabel) {
    return selectedFilters => {
      return (
        <div key={`${filterConstant}`} className="table-filter-button-group">
          {valuesArray.map((item, index) => {
            return (
              <button
                key={`button-${filterConstant}-${index}`}
                className={`${classnames('table-filter-button', 'btn', {
                  'btn-primary': !!selectedFilters[`${filterConstant}__ ${item.value}`],
                })}`}
                onClick={e => {
                  this.clearFilterGroup(filterConstant)
                  this.filterFunctions[filterConstant](e, item.value)
                }}
              >
                {item.label}
              </button>
            )
          })}

          <button
            className={`${classnames('table-filter-button', 'btn', {
              'btn-primary': !Object.keys(selectedFilters).find(
                key => key.includes(filterConstant) && selectedFilters[key]
              ),
            })}`}
            onClick={() => this.clearFilterGroup(filterConstant)}
          >
            {clearLabel}
          </button>
        </div>
      )
    }
  }
}

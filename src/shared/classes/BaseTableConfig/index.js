import React from 'react'
import { textFilter, multiSelectFilter } from 'react-bootstrap-table2-filter'
import { Button, Dropdown } from 'react-bootstrap'

import classnames from 'classnames'
export default class BaseTableConfig {
  constructor({ component = undefined } = {}) {
    this._component = component
    this._filters = {}
    this._selectedFilters = {}
    this._filterPrototypes = {
      ...this.createFilterPrototype('ACRIS_REAL_MASTER_DOCUMENT_TYPE', 'multi-select', {
        0: 'DEED',
        1: 'AALR',
        2: 'AGMT',
        3: 'AL&R',
        4: 'ASST',
        5: 'ASPM',
        6: 'DEMM',
        7: 'MTGE',
        8: 'PSAT',
        9: 'SAT',
        10: 'SMTG',
        11: 'WSAT',
        12: 'M&CON',
        13: 'SPRD',
      }),
      ...this.createFilterPrototype('HPD_VIOLATION_OPEN'),
      ...this.createFilterPrototype('HPD_VIOLATION_CLASS'),
      ...this.createFilterPrototype('HPD_COMPLAINT_OPEN'),
      // ...this.createFilterPrototype('HPD_PROBLEM_OPEN'),
      ...this.createFilterPrototype('DOB_VIOLATION_ACTIVE'),
      ...this.createFilterPrototype('DOB_COMPLAINT_ACTIVE'),
      ...this.createFilterPrototype('ECB_VIOLATION_ACTIVE'),
      ...this.createFilterPrototype('DOB_FILED_PERMIT_TYPE'),
      ...this.createFilterPrototype('DOB_ISSUED_PERMIT_TYPE'),
    }
    this._filterFunctions = {
      ...this.createFilterFunction('ACRIS_REAL_MASTER_DOCUMENT_TYPE'),
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
      ACRIS_REAL_MASTER: [
        this.createFilterButtonSet(
          'ACRIS_REAL_MASTER',
          'ACRIS_REAL_MASTER_DOCUMENT_TYPE',
          [
            this.createFilterItem('Deeds', ['DEED']),
            this.createFilterItem('Mortgages', [
              'AALR',
              'AGMT',
              'AL&R',
              'ASST',
              'ASPM',
              'DEMM',
              'MTGE',
              'PSAT',
              'SAT',
              'SMTG',
              'WSAT',
              'M&CON',
              'SPRD',
            ]),
          ],
          'All'
        ),
      ],
      HPD_VIOLATION: [
        this.createFilterButtonSet(
          'HPD_VIOLATION',
          'HPD_VIOLATION_OPEN',
          [this.createFilterItem('Open', 'open'), this.createFilterItem('Closed', 'close')],
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
          [this.createFilterItem('Open', 'open'), this.createFilterItem('Closed', 'close')],
          'All'
        ),
      ],

      DOB_COMPLAINT: [
        this.createFilterButtonSet(
          'DOB_COMPLAINT',
          'DOB_COMPLAINT_ACTIVE',
          [this.createFilterItem('Active', 'active'), this.createFilterItem('Closed', 'close')],
          'All'
        ),
      ],

      DOB_VIOLATION: [
        this.createFilterButtonSet(
          'DOB_VIOLATION',
          'DOB_VIOLATION_ACTIVE',
          [this.createFilterItem('Active', 'active'), this.createFilterItem('Dismissed', 'dismissed')],
          'All'
        ),
      ],
      ECB_VIOLATION: [
        this.createFilterButtonSet(
          'ECB_VIOLATION',
          'ECB_VIOLATION_ACTIVE',
          [this.createFilterItem('Active', 'active'), this.createFilterItem('Resolved', 'resolve')],
          'All'
        ),
      ],
      DOB_FILED_PERMIT: [
        this.createFilterButtonSet(
          'DOB_FILED_PERMIT',
          'DOB_FILED_PERMIT_TYPE',
          [
            this.createFilterItem('ALT-CO (A1)'),
            this.createFilterItem('Alteration (A2)'),
            this.createFilterItem('Full Demolition (DM)'),
            this.createFilterItem('New Building (NB)'),
            this.createFilterItem('No Work (PA)'),
            this.createFilterItem('ALT-CO: New Building with Existing Elements to Remain'),
            this.createFilterItem('A3'),
            this.createFilterItem('SC'),
            this.createFilterItem('SI'),
          ],
          'All Job Types'
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

  createFilterPrototype(constant, type = 'text', multiSelectOptions = {}) {
    switch (type) {
      case 'text':
        return {
          [constant]: textFilter({
            placeholder: 'Search...',
            getFilter: filter => {
              this.filters[constant] = filter
            },
          }),
        }
      case 'multi-select':
        return {
          [constant]: multiSelectFilter({
            options: multiSelectOptions,
            comparator: 'LIKE',
            placeholder: 'Search...',
            getFilter: filter => {
              this.filters[constant] = filter
            },
          }),
        }
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
    if (filterConstant === 'DOB_FILED_PERMIT_TYPE') {
      return selectedFilters => {
        const selectedKey = Object.keys(selectedFilters).find(key => 
          key.includes(filterConstant) && selectedFilters[key] === true
        );
        const selectedValue = selectedKey ? selectedKey.split('__ ')[1] : '';
        const foundItem = selectedValue ? valuesArray.find(item => item.value === selectedValue) : null;
        const selectedLabel = foundItem ? foundItem.label : 'All Job Types';

        const handleSelect = (e, label, value) => {
          e.preventDefault();
          this.clearFilterGroup(filterConstant);
          if (value) {
            this.filterFunctions[filterConstant](e, value);
          }
          // Update the dropdown label directly
          const dropdownToggle = e.currentTarget.closest('.dropdown').querySelector('.dropdown-toggle');
          if (dropdownToggle) {
            dropdownToggle.textContent = label;
            // Close the dropdown
            dropdownToggle.click();
          }
        };

        const dropdownItems = [
          { label: 'All Job Types', value: '' },
          { label: 'ALT-CO (A1)', value: 'ALT-CO (A1)' },
          { label: 'Alteration (A2)', value: 'Alteration (A2)' },
          { label: 'Full Demolition (DM)', value: 'Full Demolition (DM)' },
          { label: 'New Building (NB)', value: 'New Building (NB)' },
          { label: 'No Work (PA)', value: 'No Work (PA)' },
          { label: 'ALT-CO: New Building w/ Existing Elements', value: 'ALT-CO: New Building with Existing Elements to Remain' },
          { label: 'A3 (Legacy)', value: 'A3' },
          { label: 'SC (Legacy)', value: 'SC' },
          { label: 'SI (Legacy)', value: 'SI' }
        ];

        return (
          <div className="base-table__header-body-wrapper" style={{ overflow: 'visible' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Dropdown>
                <Dropdown.Toggle 
                  variant={selectedValue ? 'dark' : 'light'} 
                  size="sm" 
                  id="dropdown-basic"
                >
                  {selectedLabel}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {dropdownItems.map((item, index) => (
                    <li role="presentation" className="dropdown-item" key={`dropdown-${filterConstant}-${index}`}>
                      <button
                        type="button"
                        className="btn btn-link"
                        style={{ padding: '0.15rem' }}
                        onClick={e => handleSelect(e, item.label, item.value)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        );
      };
    }
    return selectedFilters => {
      return (
        <div key={`${filterConstant}`} className="table-filter-button-group">
          <Button
            className={`${classnames('table-filter-button')}`}
            onClick={() => this.clearFilterGroup(filterConstant)}
            size="sm"
            variant={
              !Object.keys(selectedFilters).find(key => key.includes(filterConstant) && selectedFilters[key])
                ? 'dark'
                : 'light'
            }
          >
            {clearLabel}
          </Button>
          {valuesArray.map((item, index) => {
            return (
              <Button
                key={`button-${filterConstant}-${index}`}
                className={`${classnames('table-filter-button')}`}
                variant={selectedFilters[`${filterConstant}__ ${item.value}`] ? 'dark' : 'light'}
                size="sm"
                onClick={e => {
                  this.clearFilterGroup(filterConstant)
                  this.filterFunctions[filterConstant](e, item.value)
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </div>
      )
    }
  }
}

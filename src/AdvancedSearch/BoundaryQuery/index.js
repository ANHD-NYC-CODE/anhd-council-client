import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/boundaries'

import CustomSelect from 'shared/components/CustomSelect'
import { Form } from 'react-bootstrap'

export class BoundaryQuery extends React.Component {
  constructor(props) {
    super(props)

    this.getBoundaryIdOptions = this.getBoundaryIdOptions.bind(this)
  }

  getBoundaryIdOptions(type) {
    switch (type) {
      case 'council':
        return [...this.props.districts.map(d => ({ value: { key: 'id', value: d.id }, label: d.id }))]
      case 'cd':
        return [...this.props.boards.map(b => ({ value: { key: 'id', value: b.id }, label: b.id }))]
    }
  }

  render() {
    return (
      <Form className="boundary-picker">
        {!this.props.boundaries.length && (
          <Form.Group className="boundary">
            <Form.Label>Type</Form.Label>
            <CustomSelect
              onChange={this.props.addBoundary}
              options={[
                { value: b.COUNCILBOUNDARY.constant, label: b.COUNCILBOUNDARY.name },
                { value: b.COMMUNITYBOUNDARY.constant, label: b.COMMUNITYBOUNDARY.name },
              ]}
              placeholder="Pick a geography..."
              size="sm"
            />
          </Form.Group>
        )}
        {!!this.props.boundaries.length &&
          this.props.boundaries.map((boundary, index) => {
            return (
              <Form.Group className="boundary" key={boundary.name}>
                <Form.Label>Type</Form.Label>
                <CustomSelect
                  onChange={e => this.props.changeBoundary(index, boundary, e)}
                  options={[
                    { value: { key: 'object', value: b.COUNCILBOUNDARY.constant }, label: b.COUNCILBOUNDARY.name },
                    {
                      value: { key: 'object', value: b.COMMUNITYBOUNDARY.constant },
                      label: b.COMMUNITYBOUNDARY.name,
                    },
                  ]}
                  size="sm"
                  value={{ value: boundary.constant, label: boundary.name.toLowerCase() }}
                />
                <Form.Label>{`${boundary.name} #`}</Form.Label>
                <CustomSelect
                  onChange={e => this.props.changeBoundary(index, boundary, e)}
                  options={this.getBoundaryIdOptions(boundary.queryName)}
                  size="sm"
                  value={{ value: boundary.id, label: boundary.id }}
                />
              </Form.Group>
            )
          })}
      </Form>
    )
  }
}

BoundaryQuery.propTypes = {
  addBoundary: PropTypes.func,
  changeBoundary: PropTypes.func,
  boards: PropTypes.array,
  boundaries: PropTypes.array,
  districts: PropTypes.array,
}

export default BoundaryQuery

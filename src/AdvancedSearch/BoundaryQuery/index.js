import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as b from 'shared/constants/boundaries'

import CustomSelect from 'shared/components/Select'
import { Form, Row, Col } from 'react-bootstrap'

import { addBoundary, updateBoundary } from 'Store/AdvancedSearch/actions'

class BoundaryQuery extends React.Component {
  constructor(props) {
    super(props)

    this.getBoundaryIdOptions = this.getBoundaryIdOptions.bind(this)
    this.changeBoundaryObject = this.changeBoundaryObject.bind(this)
    this.changeBoundaryId = this.changeBoundaryId.bind(this)
    this.addBoundary = this.addBoundary.bind(this)
  }

  addBoundary(option) {
    this.props.dispatch(addBoundary({ object: option.value }))
  }

  changeBoundaryObject(option, index) {
    this.props.dispatch(updateBoundary(index, { object: option.value, id: undefined }))
  }

  changeBoundaryId(option, index) {
    this.props.dispatch(updateBoundary(index, { id: option.value }))
  }

  getBoundaryIdOptions(type) {
    switch (type) {
      case 'council':
        return [...this.props.districts.map(d => ({ value: d.id, label: d.id }))]
      case 'cd':
        return [...this.props.boards.map(b => ({ value: b.id, label: b.id }))]
    }
  }

  render() {
    return (
      <div className="boundary-picker">
        {!this.props.boundaries.length && (
          <Row className="boundary">
            <Col sm={6} md={4}>
              <CustomSelect
                onChange={this.addBoundary}
                options={[
                  { value: b.COUNCILBOUNDARY, label: b.COUNCILBOUNDARY.name.toLowerCase() },
                  { value: b.COMMUNITYBOUNDARY, label: b.COMMUNITYBOUNDARY.name.toLowerCase() },
                ]}
                size="sm"
              />
            </Col>
          </Row>
        )}
        {!!this.props.boundaries.length &&
          this.props.boundaries.map((boundary, index) => {
            return (
              <Row className="boundary" key={boundary.object.name}>
                <Col sm={6} md={4}>
                  <CustomSelect
                    onChange={e => this.changeBoundaryObject(e, index)}
                    options={[
                      { value: b.COUNCILBOUNDARY, label: b.COUNCILBOUNDARY.name.toLowerCase() },
                      { value: b.COMMUNITYBOUNDARY, label: b.COMMUNITYBOUNDARY.name.toLowerCase() },
                    ]}
                    size="sm"
                    value={{ value: boundary.object, label: boundary.object.name.toLowerCase() }}
                  />
                </Col>
                <Col>
                  <CustomSelect
                    onChange={e => this.changeBoundaryId(e, index)}
                    options={this.getBoundaryIdOptions(boundary.object.queryName)}
                    size="sm"
                    value={{ value: boundary.id, label: boundary.id }}
                  />
                </Col>
              </Row>
            )
          })}
      </div>
    )
  }
}

BoundaryQuery.propTypes = {
  boards: PropTypes.array,
  boundaries: PropTypes.array,
  districts: PropTypes.array,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    boards: state.community.boards,
    districts: state.council.districts,
  }
}

export default connect(mapStateToProps)(BoundaryQuery)

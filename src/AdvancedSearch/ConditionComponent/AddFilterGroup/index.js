import React from 'react'
import PropTypes from 'prop-types'

import AddFilterButton from 'AdvancedSearch/ConditionComponent/AddFilterButton'
import { ButtonGroup } from 'react-bootstrap'

const AddFilterGroup = props => {
  return (
    <ButtonGroup>
      <AddFilterButton
        createNewFilter={props.createNewFilter}
        showPopups={props.showPopups}
        text={
          props.condition.filters.length > 1
            ? props.condition.type
            : props.condition.filters.length === 1
            ? 'AND'
            : undefined
        }
      />
      {props.condition.filters.length === 1 && (
        <AddFilterButton
          createNewFilter={props.createNewFilter}
          onClick={() => props.switchCondition('OR')}
          showPopups={props.showPopups}
          text={'OR'}
        />
      )}
    </ButtonGroup>
  )
}

AddFilterGroup.propTypes = {
  createNewFilter: PropTypes.func,
  condition: PropTypes.object,
  switchCondition: PropTypes.func,
}

export default AddFilterGroup

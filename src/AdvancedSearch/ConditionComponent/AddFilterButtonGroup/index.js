import React from 'react'
import PropTypes from 'prop-types'

import AddFilterButton from 'AdvancedSearch/ConditionComponent/AddFilterButton'
import { ButtonGroup } from 'react-bootstrap'
import classnames from 'classnames'

const AddFilterButtonGroup = props => {
  if (props.condition.key === '0') {
    return (
      <ButtonGroup className={classnames(props.className)}>
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
  } else {
    return (
      <AddFilterButton
        createNewFilter={props.createNewFilter}
        showPopups={props.showPopups}
        text={props.condition.type}
      />
    )
  }
}

AddFilterButtonGroup.propTypes = {
  createNewFilter: PropTypes.func,
  className: PropTypes.string,
  condition: PropTypes.object,
  showPopups: PropTypes.bool,
  switchCondition: PropTypes.func,
}

export default AddFilterButtonGroup

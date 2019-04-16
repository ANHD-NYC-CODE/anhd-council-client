import React from 'react'
import PropTypes from 'prop-types'
import AddConditionButton from 'AdvancedSearch/ConditionComponent/AddConditionButton'
import RemoveConditionButton from 'AdvancedSearch/ConditionComponent/RemoveConditionButton'
const ConditionControlGroup = props => {
  if (props.condition.key === '0') {
    return props.condition.filters.filter(f => f.conditionGroup).length === 0 ? (
      <AddConditionButton condition={props.condition} addCondition={props.addCondition} showPopups={props.showPopups} />
    ) : null
  } else {
    return (
      <RemoveConditionButton
        condition={props.condition}
        removeCondition={props.removeCondition}
        showPopups={props.showPopups}
      />
    )
  }
}

ConditionControlGroup.propTypes = {}

export default ConditionControlGroup

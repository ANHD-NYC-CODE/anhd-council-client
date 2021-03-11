import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import classnames from 'classnames'

import StandardizedInput from 'shared/classes/StandardizedInput'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

const AmountFilterInput = props => {
  const [value, setValue] = useState(props.value)
  const [isChanging, setChanging] = useState(false)

  const handleOnChange = e => {
    e.preventDefault()
    setChanging(true)
    e = new StandardizedInput(e)

    setValue(e.value)
  }

  const handleSubmit = (e, value) => {
    e.preventDefault()
    setChanging(false)
    e = new StandardizedInput()
    e.value = value
    if (e.value === props.value) return
    props.onSubmit(e)
  }

  return (
    <Form
      data-test-id="amount-filter-input"
      className={classnames('amount-filter-input', { active: isChanging })}
      onSubmit={e => handleSubmit(e, value)}
    >
      <Form.Group>
        <Form.Control
          data-test-id="amount-filter-input--input"
          type="number"
          min={0}
          max={999}
          onChange={handleOnChange}
          onBlur={e => handleSubmit(e, value)}
          onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleSubmit(e, value))}
          size="sm"
          value={isChanging ? value : props.value}
        />

        {/* {!!isChanging && (
          <Button data-test-id="amount-filter-input--save" variant="dark" type="submit" size="sm">
            Save
          </Button>
        )} */}
        {/* {value !== props.value && <Form.Text className="text-muted">(not saved)</Form.Text>} */}
      </Form.Group>
    </Form>
  )
}

AmountFilterInput.propTypes = {}
AmountFilterInput.defaultProps = {}

export default AmountFilterInput

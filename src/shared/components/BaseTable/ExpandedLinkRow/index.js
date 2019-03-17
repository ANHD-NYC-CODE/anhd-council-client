import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'

const ExpandedLinkRow = props => {
  return (
    <Card bg="light" border="secondary" className="expanded-row">
      <Card.Body>
        <Card.Text>{props.content}</Card.Text>
        {props.href && <Button variant="primary" as={BaseLink} href={props.href} text={props.linkText} />}
      </Card.Body>
    </Card>
  )
}

ExpandedLinkRow.propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
}

export default ExpandedLinkRow

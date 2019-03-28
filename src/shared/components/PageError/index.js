import React from 'react'
import PropTypes from 'prop-types'
import { Card, ButtonGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'

class PageError extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card bg="light" className="text-center my-6" style={{ margin: '0 auto', maxWidth: '20rem' }}>
        <Card.Header>
          <FontAwesomeIcon icon={this.props.icon} size="6x" />
        </Card.Header>

        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.message}</Card.Text>
          <ButtonGroup vertical className="d-flex">
            <Button href="/" variant="primary">
              <span className="" />
              Take Me Home{' '}
            </Button>
            <Button href="mailto:anhd.tech@gmail.com" variant="warning">
              Contact Support
            </Button>
            <span className="w-100 text-center text-primary">anhd.tech@gmail.com</span>
          </ButtonGroup>
        </Card.Body>
      </Card>
    )
  }
}

PageError.defaultProps = {
  icon: faBug,
}

PageError.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
}

export default PageError

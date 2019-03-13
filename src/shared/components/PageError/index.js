import React from 'react'
import PropTypes from 'prop-types'
import { Card, ButtonGroup, Button } from 'react-bootstrap'
class PageError extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card bg="light" className="page404 text-center" style={{ margin: '0 auto', width: '20rem' }}>
        <Card.Img variant="top" src="https://cdn4.iconfinder.com/data/icons/office-vol-2-5/48/Office-14-512.png" />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.message}</Card.Text>
          <ButtonGroup>
            <Button href="/" variant="primary">
              <span className="glyphicon glyphicon-home" />
              Take Me Home{' '}
            </Button>
            <Button href="/contact" variant="secondary">
              <span className="glyphicon glyphicon-envelope" /> Contact Support{' '}
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    )
  }
}

PageError.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
}

export default PageError

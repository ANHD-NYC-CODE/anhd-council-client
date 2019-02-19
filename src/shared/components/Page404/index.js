import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Jumbotron, Card, ButtonGroup, Button } from 'react-bootstrap'
class Page404 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card bg="light" className="page404 text-center" style={{ margin: '0 auto', width: '20rem' }}>
        <Card.Img variant="top" src="https://cdn4.iconfinder.com/data/icons/office-vol-2-5/48/Office-14-512.png" />
        <Card.Body>
          <Card.Title>Oops! 404 Not Found.</Card.Title>
          <Card.Text>Sorry, an error has occured, Requested page not found!</Card.Text>
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

Page404.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    store: state,
  }
}

export default connect(mapStateToProps)(Page404)

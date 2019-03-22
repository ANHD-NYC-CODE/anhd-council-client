import React from 'react'
import { Jumbotron } from 'react-bootstrap'
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {}

  render() {
    if (this.state.hasError) {
      return (
        <Jumbotron>
          <h1>Something went wrong.</h1>
          <div>
            <a href="/">Take me home</a>
          </div>
        </Jumbotron>
      )
    }

    return this.props.children
  }
}

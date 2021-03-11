import React from 'react'

import PageError from 'shared/components/PageError'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <PageError
          title="Sorry, you encountered an internal service error!"
          message="Please try what you were doing again. If the error persists, please let us know!"
        />
      )
    }

    return this.props.children
  }
}

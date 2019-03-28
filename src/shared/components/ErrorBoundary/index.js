import React from 'react'
import PageError from 'shared/components/PageError'
import Layout from 'Layout'

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
        <PageError
          title="Sorry, you encountered an internal service error!"
          message="Please try what you were doing again. If there error persists, please let us know!"
        />
      )
    }

    return this.props.children
  }
}

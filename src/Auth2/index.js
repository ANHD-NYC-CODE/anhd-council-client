import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { refreshTokens } from 'Store/Auth/actions'

class Auth2 extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    if (props.auth && props.auth.refresh) {
      props.dispatch(refreshTokens(props.auth.refresh.token))
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

Auth2.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Auth2)

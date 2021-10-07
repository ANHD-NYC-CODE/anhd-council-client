import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './style.scss'

import UserContext from 'Auth/UserContext'

class MyDashboard extends React.Component {
constructor(props) {
super(props);
}

render() {
  console.log(this.props);
    return (
      <UserContext.Consumer>
        {auth => {
          if (!auth.user) {
            // Redirect to homepage
            console.log("Redirect");
          }
          return (
            <div>
              <h3>Welcome {auth.user.username}</h3>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

MyDashboard.propTypes = {
auth: PropTypes.object,
path: PropTypes.string,
}

const mapStateToProps = state => {
return {
appState: state.appState,
}
}

export default connect(mapStateToProps)(MyDashboard)

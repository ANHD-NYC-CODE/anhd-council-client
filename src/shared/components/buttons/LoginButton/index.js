import React from 'react'
import PropTypes from 'prop-types'
import LoginModal from '../../modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

class LoginButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: '',
    }
  }
  render() {
    return (
      <div className="bookmark-button__container">
                  <div
                    onClick={e => {
                      e.preventDefault()
                      this.props.modal.setModal({
                        modalComponent: LoginModal,
                        modalProps: {
                          modalFooter: <LoginModalFooter modal={this.props.modal} />,
                          modal: this.props.modal
                        },
                      })
                    }}
                  >
                    
                    <FontAwesomeIcon
                            className="bookmark-button__icon_inactive"
                            icon={faBookmark}
                            size="lg"
                        />
                      <span className="mobile-hide">
                      Login to bookmark this property
                      </span>
                  </div>
      </div>
    )
  }
}

LoginButton.propTypes = {

  modal: PropTypes.object,
  auth: PropTypes.object

}

export default LoginButton
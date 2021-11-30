import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import ModalContext from 'Modal/ModalContext'
import RequestAccessForm from 'shared/components/forms/RequestAccessForm'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'

import "./style.scss"

class RequestAccessModal extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      switchedToForm: false
    }

    this.toggleViewPolicy = this.toggleViewPolicy.bind(this);
  }

  resetStateThenHideModal(modal) {
    this.setState({
      switchedToForm: false
    })
    modal.hideModal();
  }

  toggleViewPolicy(e) {
    e.preventDefault();
    this.setState({
      switchedToForm: true
    })
  }

  render() {
    return (
      <ModalContext.Consumer>
        {modal => {
          return (
            <BaseModal
              centered={true}
              className="auth-request-access-modal"
              labelId={this.props.labelId}
              modalFooter={this.props.modalFooter}
              hideModal={() => this.resetStateThenHideModal(modal)}
              show={this.props.show}
              title="Request access to housing court and foreclosures data"
            >
              {this.props.viewPolicy && !this.state.switchedToForm && (
                <div className="request-access-modal__policy">
                  <p className="request-access-modal__text">
                    Because of the sensitive nature of housing court and 
                    foreclosures data, we limit access to this data to users who are:
                  </p>
                  <div>
                    <ol>
                      <li className="request-access-modal__text">
                        Staff of ANHD member organizations
                      </li>
                      <li className="request-access-modal__text">
                        New York City and State elected officials and their staff, 
                        members of community boards, and staff of government agencies
                      </li>
                    </ol>
                  </div>
                  <p className="request-access-modal__text mb-3">
                    We will also consider requests from partner and allied organizations
                    or individuals who are using this data to stop speculation and 
                    displacement and/or further tenant and small homeowner rights and who
                    are not profiting from its use. 
                  </p>
                  <p><a onClick={e => this.toggleViewPolicy(e)} className="request-access-modal__text mb-3">
                    Click here to request access to housing court and foreclosures data
                  </a></p>
                  <p><a href="https://portal.displacementalert.org/policies/data-access-policy" 
                  target="_blank" className="request-access-modal__text mb-3">
                    Click here to read our data access policy
                  </a></p>
                </div>
              )}
              {(!this.props.viewPolicy || this.state.switchedToForm) && (
                <RequestAccessForm 
                  dispatch={this.props.dispatch}
                  loading={this.props.loading}
                  error={this.props.error}
                  modal={modal}
                />
              )}
            </BaseModal>
          )
        }}
      </ModalContext.Consumer>
    )
  }
}

RequestAccessModal.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  labelId: PropTypes.string,
  loading: PropTypes.bool,
  modalFooter: PropTypes.object,
  hideModal: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  viewPolicy: PropTypes.bool
}

const mapStateToProps = state => {
  const errorSelector = createErrorSelector(['POST_USER_ACCESS_REQUEST'])
  const loadingSelector = createLoadingSelector(['POST_USER_ACCESS_REQUEST'])

  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(RequestAccessModal)

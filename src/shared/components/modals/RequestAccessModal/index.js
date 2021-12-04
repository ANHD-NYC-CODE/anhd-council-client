import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import ModalContext from 'Modal/ModalContext'
import RequestAccessForm from 'shared/components/forms/RequestAccessForm'
import { deleteUserAccessRequest } from 'Store/Request/actions'
import { getUserProfile } from 'Store/Auth/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import FormError from 'shared/components/FormError'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import "./style.scss"

class RequestAccessModal extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      switchedToForm: false
    }

    this.toggleViewPolicy = this.toggleViewPolicy.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
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

  handleSuccessfulDelete(modal) {
    this.props.dispatch(
      requestWithAuth(getUserProfile())
    );
    toast.success("Access request deleted. You can now submit a new one!")
    modal.hideModal();
  }

  deleteRequest(modal) {
    const areYouSure = confirm("Are you sure you want to delete your pending access request?");
    if (!areYouSure) return;

    this.props.dispatch(requestWithAuth(deleteUserAccessRequest(
      () => this.handleSuccessfulDelete(modal)
    )));
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
              {(!this.props.viewPolicy || this.state.switchedToForm) && this.props.userAccessRequestStatus !== "pending" && (
                <RequestAccessForm 
                  dispatch={this.props.dispatch}
                  loading={this.props.loading}
                  error={this.props.error}
                  modal={modal}
                />
              )}
              {(!this.props.viewPolicy || this.state.switchedToForm) && this.props.userAccessRequestStatus === "pending" && (
                <div className="request-access-modal__pending">
                  <FormError show={!!this.props.deleteError && this.props.deleteError.status !== 500} message={(this.props.deleteError || {}).message} />
                  <p className="request-access-modal__text">
                    You have already submitted a request. If you need to change the 
                    information you submitted, click below to delete that request, 
                    which will allow you to submit a new request.
                  </p>
                  <button
                    className="btn btn-dark btn-loader col-12"
                    block 
                    disabled={this.props.deleteLoading}
                    variant="outline-dark"
                    size="md"
                    onClick={() => this.deleteRequest(modal)}
                  >
                    <span>Delete pending access request</span>
                    <div className="button-loader__container">{this.props.loading && <SpinnerLoader size="20px" />}</div>
                  </button>
                </div>
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
  const deleteErrorSelector = createErrorSelector(['DELETE_USER_ACCESS_REQUEST'])
  const deleteLoadingSelector = createLoadingSelector(['DELETE_USER_ACCESS_REQUEST'])
  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
    deleteError: deleteErrorSelector(state),
    deleteLoading: deleteLoadingSelector(state),
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(RequestAccessModal)

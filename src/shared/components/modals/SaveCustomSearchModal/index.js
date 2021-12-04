import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import UserContext from 'Auth/UserContext'
import SaveCustomSearchForm from 'shared/components/forms/SaveCustomSearchForm'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import * as c from "Store/MyDashboard/constants";

const SaveOrEditCustomSearch = props => {
  return (
    <UserContext.Consumer>
      {auth => {
        if (!auth.user) 
            props.hideModal();
        
        return (
          <BaseModal
            centered={true}
            className="auth-login-modal"
            labelId={props.labelId}
            modalFooter={props.modalFooter}
            hideModal={props.hideModal}
            show={props.show}
            title={props.editing ? "Edit Saved Custom Search" : "Save Custom Search"}
          >
            <SaveCustomSearchForm
              dispatch={props.dispatch}
              queryName={props.queryName}
              url={props.url}
              id={props.id}
              postSave={props.hideModal}
              notifications={props.notifications}
              notificationFrequency={props.notificationFrequency}
              editing={props.editing}
              error={props.editing ? props.editError : props.error}
              loading={props.editing ? props.editLoading : props.loading}
              deleteError={props.deleteError}
              deleteLoading={props.deleteLoading}
            />
          </BaseModal>
        )
      }}
    </UserContext.Consumer>
  )
}

SaveOrEditCustomSearch.defaultProps = {
  user: {},
}

SaveOrEditCustomSearch.propTypes = {
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
}

const mapStateToProps = state => {
  const editErrorSelector = createErrorSelector([c.UPDATE_CUSTOM_SEARCH]);
  const editLoadingSelector = createLoadingSelector([c.UPDATE_CUSTOM_SEARCH]);
  const errorSelector = createErrorSelector([c.SAVE_CUSTOM_SEARCH]);
  const loadingSelector = createLoadingSelector([c.SAVE_CUSTOM_SEARCH]);
  const deleteErrorSelector = createErrorSelector([c.DELETE_CUSTOM_SEARCH]);
  const deleteLoadingSelector = createLoadingSelector([c.DELETE_CUSTOM_SEARCH]);

  return {
    editError: editErrorSelector(state),
    editLoading: editLoadingSelector(state),
    deleteError: deleteErrorSelector(state),
    deleteLoading: deleteLoadingSelector(state),
    error: errorSelector(state),
    loading: loadingSelector(state),
    user: state.auth.user
  }
}
export default connect(mapStateToProps)(SaveOrEditCustomSearch)

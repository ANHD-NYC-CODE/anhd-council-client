import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import UserContext from 'Auth/UserContext'
import SaveCustomSearchForm from 'shared/components/forms/SaveCustomSearchForm'
import { connect } from 'react-redux'

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

export default connect()(SaveOrEditCustomSearch)

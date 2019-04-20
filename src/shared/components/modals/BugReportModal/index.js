import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import BugReportForm from 'shared/components/forms/BugReportForm'
import ModalContext from 'Modal/ModalContext'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
const BugReportModal = props => {
  return (
    <ModalContext.Consumer>
      {modal => {
        return (
          <BaseModal
            centered={true}
            labelId={props.labelId}
            modalFooter={props.modalFooter}
            hideModal={modal.hideModal}
            show={props.show}
            size={props.size}
            title="Report a bug"
          >
            <BugReportForm
              dispatch={props.dispatch}
              error={props.error}
              loading={props.loading}
              hideModal={modal.hideModal}
            />
          </BaseModal>
        )
      }}
    </ModalContext.Consumer>
  )
}

BugReportModal.propTypes = {
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
  const errorSelector = createErrorSelector(['POST_BUG_REPORT'])
  const loadingSelector = createLoadingSelector(['POST_BUG_REPORT'])

  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(BugReportModal)

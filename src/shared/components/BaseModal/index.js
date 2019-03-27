import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'

const BaseModal = props => {
  return (
    <Modal
      aria-labelledby={props.labelId}
      centered={props.centered}
      className={props.className}
      dialogClassName={props.dialogClassName}
      onHide={props.onHide}
      show={props.show}
      size={props.size}
    >
      <Modal.Header closeButton>
        <Modal.Title id={props.labelId}>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body || props.children}</Modal.Body>
      {!!(props.sources || {}).length && (
        <Modal.Body>
          <p>Source:</p>
          {props.sources.map((source, index) => {
            return (
              <div key={`source-${index}`}>
                <BaseLink className="text-muted" href={source.url} text={source.text} />
              </div>
            )
          })}
        </Modal.Body>
      )}

      {props.modalFooter}
    </Modal>
  )
}

BaseModal.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  labelId: PropTypes.string,
  modalFooter: PropTypes.object,
  onHide: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
}

BaseModal.defaultProps = {
  className: 'modal',
  title: 'Modal Title',
  centered: true,
}

export default BaseModal

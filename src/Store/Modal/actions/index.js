export const HANDLE_MODAL_ACTION = 'HANDLE_MODAL_ACTION'

export const openModal = (type, modalProps) => {
  modalProps = { ...modalProps, show: true }
  return {
    type: HANDLE_MODAL_ACTION,
    data: { type, modalProps },
  }
}

export const closeModal = (type, modalProps) => {
  modalProps = { ...modalProps, show: false }
  return {
    type: HANDLE_MODAL_ACTION,
    data: { type, modalProps },
  }
}

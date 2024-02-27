// Modal.tsx
import React from 'react'
import {Modal as BootstrapModal} from 'react-bootstrap'

interface ModalProps {
  show: boolean
  onClose: () => void
  modalContent: JSX.Element
  modalSize: any
  modalTile: string
}

const CustomModal: React.FC<ModalProps> = ({show, onClose, modalContent, modalSize, modalTile}) => {
  return (
    <>
      <BootstrapModal show={show} onHide={onClose} centered backdrop='static' size={modalSize}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{modalTile}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{modalContent}</BootstrapModal.Body>
      </BootstrapModal>
      <div className={` ${show ? 'modal-backdrop fade show' : ''}`}></div>
    </>
  )
}

export default CustomModal

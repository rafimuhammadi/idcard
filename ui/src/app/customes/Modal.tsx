import React, {FunctionComponent} from 'react'
import ReactDOM from 'react-dom'
import {KTSVG} from '../../_metronic/helpers'
import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop,
} from './modal.style'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent: JSX.Element
  headerText: string
}

export const Modal: FunctionComponent<ModalProps> = ({isShown, hide, modalContent, headerText}) => {
  const modal = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>
              <h3 className='fw-bolder m-0'>
                <i className='fa fa-key fs-3 text-primary'></i> {headerText}
              </h3>
            </HeaderText>
            <CloseButton className='btn btn-sm btn-icon btn-active-color-primary' onClick={hide}>
              <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
            </CloseButton>
          </Header>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}

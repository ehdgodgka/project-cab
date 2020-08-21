import React from 'react';
import './Modal.scss';
// import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const Modal = ({ show, onClickCloseBtn, children }) => {
  return (
    <>
      <Backdrop show={show} />
      <div
        className='modal'
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}>
        <Button className='button--circle modal__close-btn' onClick={onClickCloseBtn}>
          <Icon icon='back' size='35px' />
        </Button>
        {children}
      </div>
    </>
  );
};

export default Modal;

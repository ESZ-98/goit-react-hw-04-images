import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ source, descr, closeModalMouse, closeModalKey }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModalKey);
    return () => {
      document.addEventListener('keydown', closeModalKey);
    };
  }, [closeModalKey]);

  return (
    <div className={css.overlay} onClick={closeModalMouse}>
      <div className={css.modal}>
        <img src={source} alt={descr} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  source: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  closeModalMouse: PropTypes.func.isRequired,
  closeModalKey: PropTypes.func.isRequired,
};

export default Modal;

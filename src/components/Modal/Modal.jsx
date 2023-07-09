import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModalKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModalKey);
  }

  render() {
    const properties = this.props;
    const { descr, source, closeModalMouse } = properties;
    return (
      <div className={css.overlay} onClick={closeModalMouse}>
        <div className={css.modal}>
          <img src={source} alt={descr} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  source: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  closeModalMouse: PropTypes.func.isRequired,
  closeModalKey: PropTypes.func.isRequired,
};

export default Modal;

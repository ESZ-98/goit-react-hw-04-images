import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ pageHandler }) => {
  return (
    <button type="button" className={css.button} onClick={pageHandler}>
      Load more
    </button>
  );
};

Button.propTypes = {
  pageHandler: PropTypes.func.isRequired,
};

export default Button;

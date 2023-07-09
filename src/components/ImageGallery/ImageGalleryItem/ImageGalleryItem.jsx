import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  smallSource,
  alt,
  longFormatUrl,
  galleryFunction,
}) => {
  const onClickHandler = (desc, url) => {
    return { longFormatUrl: url, alt: desc };
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={smallSource}
        alt={alt}
        className={css.galleryItemImage}
        onClick={() => galleryFunction(onClickHandler(alt, longFormatUrl))}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallSource: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  longFormatUrl: PropTypes.string.isRequired,
  galleryFunction: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

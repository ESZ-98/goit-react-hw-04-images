import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

const ImageGallery = ({ data }) => {
  const [longUrl, setlongUrl] = useState('');
  const [description, setDescription] = useState('');

  const clearState = () => {
    setlongUrl('');
    setDescription('');
  };

  const closeModalEsc = event => {
    if (event.key === 'Escape') clearState();
  };

  const closeModalClick = () => {
    clearState();
  };

  const handleItem = callback => {
    const { longFormatUrl, alt } = callback;
    setlongUrl(longFormatUrl);
    setDescription(alt);
  };

  return (
    <>
      <ul className={css.gallery}>
        {data.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            smallSource={webformatURL}
            alt={tags}
            longFormatUrl={largeImageURL}
            galleryFunction={handleItem}
          />
        ))}
      </ul>
      {longUrl !== '' && (
        <Modal
          descr={description}
          source={longUrl}
          closeModalMouse={closeModalClick}
          closeModalKey={closeModalEsc}
        />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    longUrl: '',
    description: '',
  };

  clearState = () => {
    this.setState({ longUrl: '', description: '' });
  };

  closeModalEsc = event => {
    if (event.key === 'Escape') this.clearState();
  };

  closeModalClick = () => {
    this.clearState();
  };

  handleItem = callback => {
    const { longFormatUrl, alt } = callback;
    this.setState({ longUrl: longFormatUrl, description: alt });
  };

  render() {
    const data = this.props.data;
    const state = this.state;
    const { longUrl, description } = state;
    return (
      <>
        <ul className={css.gallery}>
          {data.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              smallSource={webformatURL}
              alt={tags}
              longFormatUrl={largeImageURL}
              galleryFunction={this.handleItem}
            />
          ))}
        </ul>
        {longUrl !== '' && (
          <Modal
            descr={description}
            source={longUrl}
            closeModalMouse={this.closeModalClick}
            closeModalKey={this.closeModalEsc}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import css from './App.module.css';
import { pixabayApi } from 'components/API/pixabay-api';
import { apiUrl } from 'components/API/pixabay-url';

export const App = () => {
  const [querry, setQuerry] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);

  const apiUrlState = useCallback(async () => {
    setIsLoading(true);
    if (page === 1) {
      try {
        const answer = await pixabayApi(apiUrl(querry, page, perPage));
        setPictures(answer.data.hits);
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const answer = await pixabayApi(apiUrl(querry, page, perPage));
        setPictures(prevState => {
          return [...prevState, ...answer.data.hits];
        });
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    }
  }, [querry, page]);

  const submitHandlerSearch = value => {
    setQuerry(value);
    setPage(1);
  };

  const pageHandlerButton = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (querry !== '' || page !== 1) apiUrlState();
  }, [querry, page, apiUrlState]);

  return (
    <>
      <div className={css.app}>
        <Searchbar onSubmit={submitHandlerSearch} />
        {isLoading && <Loader />}
        {error !== null && <p>An error has occured: {error}</p>}
        {pictures.length > 0 && (
          <div className={css.page}>
            <ImageGallery data={pictures} />
            <Button pageHandler={pageHandlerButton} />
          </div>
        )}
      </div>
    </>
  );
};

import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import css from './App.module.css';
import { pixabayApi } from 'components/API/pixabay-api';
import { apiUrl } from 'components/API/pixabay-url';

export class App extends Component {
  state = {
    querry: '',
    page: 1,
    perPage: 12,
    isLoading: false,
    pictures: [],
    error: null,
  };

  apiUrlState = async () => {
    const { querry, page, perPage } = this.state;
    this.setState({ isLoading: true });
    if (page === 1) {
      try {
        const answer = await pixabayApi(apiUrl(querry, page, perPage));
        this.setState({ pictures: answer.data.hits });
      } catch (er) {
        this.setState({ error: er });
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      try {
        const answer = await pixabayApi(apiUrl(querry, page, perPage));
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...answer.data.hits],
        }));
      } catch (er) {
        this.setState({ error: er });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  submitHandlerSearch = value => {
    this.setState({ querry: value, page: 1 });
  };

  pageHandlerButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { pictures, isLoading, error } = this.state;
    return (
      <>
        <div className={css.app}>
          <Searchbar onSubmit={this.submitHandlerSearch} />
          {isLoading && <Loader />}
          {error !== null && <p>An error has occured: {error}</p>}
          {pictures.length > 0 && (
            <div className={css.page}>
              <ImageGallery data={this.state.pictures} />

              <Button pageHandler={this.pageHandlerButton} />
            </div>
          )}
        </div>
      </>
    );
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.querry !== this.state.querry ||
      prevState.page !== this.state.page
    )
      await this.apiUrlState();
  }
}

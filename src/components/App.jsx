// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { getImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import BtnLoadMore from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { GlobalStyle } from './GlobalStyled';
import { AppSection } from './App.Style';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');

  const handleChange = newQuery => {
    setSearchQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        const response = await getImages(searchQuery, page);
        setImages(images => [...images, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
      } catch (error) {
        setError('Whoops, something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [searchQuery, page]);

  const ButtonMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppSection>
      <Searchbar submit={handleChange} />

      {error && <p>Whoops, something went wrong</p>}
      {isLoading && <p>Loading...</p>}
      {images.length > 0 && <ImageGallery images={images} />}

      {images.length === 0 || page >= totalHits / 12 ? (
        <></>
      ) : (
        <BtnLoadMore clickLoadMore={ButtonMore} />
      )}

      <GlobalStyle />
    </AppSection>
  );
};

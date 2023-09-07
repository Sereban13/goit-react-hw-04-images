import { Component } from 'react';
import { getImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import BtnLoadMore from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { GlobalStyle } from './GlobalStyled';
import { AppSection } from './App.Style';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    page: 1,
    totalHits: 0,
  };

  handleChange = newQuery => {
    this.setState({
      searchQuery: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const response = await getImages(searchQuery, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          totalHits: response.data.totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handleBtnMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error, page, totalHits } = this.state;

    return (
      <AppSection>
        <Searchbar submit={this.handleChange} />

        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {images.length > 0 && <ImageGallery images={images} />}

        {images.length === 0 || page >= totalHits / 12 ? (
          <></>
        ) : (
          <BtnLoadMore clickLoadMore={this.handleBtnMore} />
        )}

        <GlobalStyle />
      </AppSection>
    );
  }
}

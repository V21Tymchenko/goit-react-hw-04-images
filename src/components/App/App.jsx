import { Component } from 'react';
import Searchbar from '../Searchbar';
import fetchImages from '../../Helpers/ImageFromApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import s from './App.module.css';
import { Audio } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: 'idle',
    error: null,
    largeImageURL: '',
    imgTags: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      try {
        this.setState({ loading: true, status: 'pending' });

        await fetchImages(imageName, page).then(images => {
          if (images.length === 0) {
            this.setState(prevState => (prevState.images = []));

            toast.error(`no picture with name ${imageName}`, {
              icon: '🥺',
            });
            return;
          }
          this.setState({
            images: [...this.state.images, ...images],
            status: 'resolved',
          });
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('we can not find');
      } finally {
        this.setState({ loading: false });
      }
    }
    if (prevState.page !== page) {
    }
  }
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  handleSelectedImage = (largeImageURL, imgTags) => {
    this.setState({ largeImageURL, imgTags });
  };
  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { imageName, loading, images, error, largeImageURL, imgTags } =
      this.state;
    return (
      <div style={{ width: 1200, height: 1000, padding: 20 }}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && toast.error('sorry, try again')}
        {loading && (
          <div className={s.loading}>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="orange"
              ariaLabel="loading"
              wrapperStyle
            />
          </div>
        )}

        {!imageName && <p className={s.looking}>What are you looking for? </p>}
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              handleSelectedImage={this.handleSelectedImage}
            />
            <button
              className={s.buttonMain}
              type="button"
              onClick={this.handleLoadMore}
            >
              Learn more
            </button>
          </>
        )}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            imgTags={imgTags}
            onClose={this.closeModal}
          >
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
        <Toaster />
      </div>
    );
  }
}

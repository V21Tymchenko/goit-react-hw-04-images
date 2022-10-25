import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar';
import fetchImages from 'helpers/ImageFromApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import s from './App.module.css';
import { Audio } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [imageName, setImageName] = useState(null);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getApi(imageName, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName]);

  useEffect(() => {
    getApi(imageName, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName, page]);

  function getApi(findImage, numberPage) {
    if (!findImage) return;

    async function imageApi() {
      try {
        setLoading(true);
        const getImages = await fetchImages(findImage, numberPage);

        if (findImage.trim() === '' || getImages.length === 0) {
          return toast.error(`no picture with name ${findImage}`, {
            icon: '🥺',
          });
        }
        setImages([...images, ...getImages]);
      } catch (error) {
        return toast.error('we can not find');
      } finally {
        setLoading(false);
      }
    }
    imageApi();
  }

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const handleSelectedImage = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
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
            handleSelectedImage={handleSelectedImage}
          />
          <button
            className={s.buttonMain}
            type="button"
            onClick={() => setPage(page => page + 1)}
          >
            Learn more
          </button>
        </>
      )}
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          imgTags={imgTags}
          onClose={() => setLargeImageURL('')}
        >
          <img src={largeImageURL} alt={imgTags} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.Styled';

const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(image => {
        return (
          <>
            <ImageGalleryItem imgItem={image} />
          </>
        );
      })}
    </GalleryList>
  );
};
export default ImageGallery;

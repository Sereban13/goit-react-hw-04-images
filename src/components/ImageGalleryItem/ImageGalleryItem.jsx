// import { Component } from 'react';
import { useState } from 'react';
import { ImgGalletyItem } from './ImageGalleryItem.Styled';
import Modal from 'react-modal';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1200',
  },
  content: {
    maxWidth: 'calc(100vw - 36px)',
    maxHeight: 'calc(100vh - 12px)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({
  imgItem: { id, webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ImgGalletyItem key={id} onClick={() => setIsModalOpen(true)}>
        <img src={webformatURL} alt={tags} />
      </ImgGalletyItem>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
        style={modalStyles}
      >
        <img src={largeImageURL} alt={tags} />
      </Modal>
    </>
  );
};

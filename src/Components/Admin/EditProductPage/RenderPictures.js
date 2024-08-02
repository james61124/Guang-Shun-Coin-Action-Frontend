import React, { useState, useEffect } from 'react';
import styles from './RenderPictures.module.css';
import CropImageModal from './CropImageModal';
import Modal from 'react-modal';

// Maximum number of pictures allowed
const MAX_PICTURES = 5;

// Custom styles for the modal
const customStyles = {
  content: {
    backgroundColor: '#BFCFD9',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  }
};

const RenderPictures = ({ images, setImages }) => {
  const [pictures, setPictures] = useState(images);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  // Handle image upload and open crop modal
  const handleUpload = (ev) => {
    setShowCropModal(true);
  };

  // Handle cropped image and update pictures
  const handleCrop = (croppedImage) => {
    setPictures(prevPictures => croppedImage.slice(0, MAX_PICTURES));
    setImages(prevPictures => croppedImage.slice(0, MAX_PICTURES));
    setShowCropModal(false);
    setImageToCrop(null);
  };

  // Render primary picture or placeholder for upload
  const renderPrimaryPicture = () => (
    <label htmlFor="fileUpload" className={styles.primaryPic}>
      {pictures[0] ? 
        (<img src={pictures[0]} alt="Primary" className={styles.uploadedPrimaryPic} onClick={handleUpload}/>) : 
         (<div className={styles.primaryPic} onClick={handleUpload}>
            <div className={styles.uploadPlaceholder}>
              <img src={`/assets/upload-image.png`} className={styles.uploadIcon}/>
            </div>
          </div>)}
    </label>
  );

  // Render secondary pictures or empty slots
  const renderSecondaryPictures = () => (
    <div className={styles.secondaryPics}>
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className={styles.secondaryPic}>
          {pictures[index] && (
            <img src={pictures[index]} alt={`Secondary ${index}`} className={styles.uploadedImage} />
          )}
        </div>
      ))}
    </div>
  );

  // Update pictures when the images prop changes
  useEffect(() => {
    setPictures(images);
  }, [images]);

  return (
    <div className={styles.picContainer}>
      <div>
        {renderPrimaryPicture()}
        {renderSecondaryPictures()}
      </div>
      {showCropModal && (
        <Modal
          isOpen={showCropModal}
          shouldCloseOnOverlayClick={false} 
          style={customStyles} 
        >
          <CropImageModal
            images={pictures}
            onClose={handleCrop}
          />
        </Modal>
      )}
    </div>
  );
};

export default RenderPictures;
import React, { useState } from 'react';
import styles from './RenderPictures.module.css';
import CropImageModal from './CropImageModal';
import Modal from 'react-modal';
import uploadImage from '../../assets/upload-image.png'; 

const MAX_PICTURES = 5;

// Modal.setAppElement('#root'); // 设置你的应用的根元素，防止屏幕阅读器的内容显示

const RenderPictures = ({ images, setImages }) => {
  const [pictures, setPictures] = useState([]);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const handleUpload = (ev) => {
    setShowCropModal(true);
  };

  const handleCrop = (croppedImage) => {
    setPictures(prevPictures => croppedImage.slice(0, MAX_PICTURES));
    setImages(prevPictures => croppedImage.slice(0, MAX_PICTURES));
    setShowCropModal(false);
    setImageToCrop(null);
  };

  const renderPrimaryPicture = () => (
    <label htmlFor="fileUpload" className={styles.primaryPic}>
      {pictures[0] ? 
        (<img src={pictures[0]} alt="Primary" className={styles.uploadedPrimaryPic} onClick={handleUpload}/>) : 
         (<div className={styles.primaryPic} onClick={handleUpload}>
            <div>
              <img src={uploadImage} className={styles.uploadIcon}/>
            </div>
          </div>)}
    </label>
  );

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
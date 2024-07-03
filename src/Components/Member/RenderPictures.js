import React, { useState } from 'react';
import styles from './RenderPictures.module.css';

const MAX_PICTURES = 5;

const RenderPictures = () => {
  const [pictures, setPictures] = useState([]);
  

  const handleUpload = (ev) => {
    const files = Array.from(ev.target.files);
    const newPictures = files.slice(0, MAX_PICTURES - pictures.length);
    
    Promise.all(newPictures.map(readFileAsDataURL))
      .then(results => {
        setPictures(prevPictures => [...prevPictures, ...results].slice(0, MAX_PICTURES));
      });
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target.result);
      reader.readAsDataURL(file);
    });
  };

  const renderPrimaryPicture = () => (
    <label htmlFor="fileUpload" className={styles.primaryPic}>
      {pictures[0] ? 
        (<img src={pictures[0]} alt="Primary" className={styles.uploadedPrimaryPic} />) : 
        (<div className={styles.primaryPic}></div>)}
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
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
    </div>

  );
};

export default RenderPictures;
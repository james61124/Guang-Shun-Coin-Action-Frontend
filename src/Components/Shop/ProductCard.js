import styles from './ProductCard.module.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import config from '../../config/config';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({cards}) => {
  return (
      <div className={styles.productContainer}>
        {cards.map((productCard, i) => (
          <Card
            key={i}
            product={productCard.product}
            imgUrl={productCard.imgUrl}
            productID={productCard.productID}
          />
        ))}
      </div>

  );
}

const Card = ({key, product, imgUrl, productID}) => {
  const { backendUrl } = config;
  const [trackingImage, setTrackingImage] = useState(`${backendUrl}/assets/untrack.png`);
  const navigate = useNavigate();

  const handleClick = () => {
    setTrackingImage(trackingImage === `${backendUrl}/assets/untrack.png` ? `${backendUrl}/assets/track.png` : `${backendUrl}/assets/untrack.png`);
  };

  const handleProduct = (id) => {
    navigate(`/detail/${id}`);
  };
  
  return (
    <div key={key} className={styles.productCard}>
      <div className={styles.productInfo} >
        <div className={styles.productPic} onClick={() => handleProduct(productID)}>
          <img src={imgUrl} alt={product} className={styles.image}></img>
          <p>{product}</p>
        </div>
        <div className={styles.productTime}></div>
        <div >
          {/* <button onClick={handleClick} className={styles.productTracking}></button> */}
          <button onClick={handleClick} className={styles.productTracking}>
          <img src={trackingImage} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
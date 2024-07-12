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
  const [trackingImage, setTrackingImage] = useState(`/assets/untrack.png`);
  const navigate = useNavigate();

  const handleClick = () => {
    setTrackingImage(trackingImage === `/assets/untrack.png` ? `/assets/track.png` : `/assets/untrack.png`);
  };

  const handleProduct = (id) => {
    navigate(`/detail/${id}`);
  };
  
  return (
    <div key={key} className={styles.productCard}>
      <div className={styles.productInfo} >
        <div className={styles.productPic} onClick={() => handleProduct(productID)}>
          <img src={imgUrl} alt={product} className={styles.image}></img>
        </div>
        {/* <div className={styles.productTime}></div> */}
        <div>
          <button onClick={handleClick} className={styles.productTracking}>
            <img src={trackingImage} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.productTitle}>{product}</div>
    </div>
  )
}

export default ProductCard
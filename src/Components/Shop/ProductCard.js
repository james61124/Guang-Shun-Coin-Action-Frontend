import styles from './ProductCard.module.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import config from '../../config/config';

const ProductCard = ({page, sort, category}) => {

  const { backendUrl } = config;
  const [cards, setCards] = useState([])

  useEffect(() => {
    const data = {
      "page": page,
      "sort": sort,
      "category": category
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${backendUrl}/shop/product`, data);
        const productData = response.data.Data.map(product => ({
          product: product.productName,
          imgUrl: `${backendUrl}/assets/coin.jpg`
        }));
        console.log(productData)
        setCards(productData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [backendUrl, page, sort, category]);

  return (
      <div className={styles.productContainer}>
        {cards.map((productCard, i) => (
          <Card
            key={i}
            product={productCard.product}
            imgUrl={productCard.imgUrl}
          />
        ))}
      </div>

  );
}

const Card = ({key, product, imgUrl}) => {
  const { backendUrl } = config;
  const [trackingImage, setTrackingImage] = useState(`${backendUrl}/assets/untrack.png`);
  const handleClick = () => {
    setTrackingImage(trackingImage === `${backendUrl}/assets/untrack.png` ? `${backendUrl}/assets/track.png` : `${backendUrl}/assets/untrack.png`);
  };
  
  return (
    <div key={key} className={styles.productCard}>
      <div className={styles.productInfo} >
        <div className={styles.productPic}>
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
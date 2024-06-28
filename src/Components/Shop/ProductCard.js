import styles from './ProductCard.module.css';
import React, { useState} from 'react'

function ProductCard() {
  // const [cards, setCards] = useState([]);
  const [cards ] = useState([
    {
      id: "1",
      product: "商品名稱商品名稱商品名稱1",
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJJUgfDtA4d_ahP54YDMr8WlrO50FdIK6pg&s',
    },
    {
      id: "2",
      product: "商品名稱商品名稱商品名稱2",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJJUgfDtA4d_ahP54YDMr8WlrO50FdIK6pg&s",
    },
    {
      id: "3",
      product: "商品名稱商品名稱商品名稱3",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJJUgfDtA4d_ahP54YDMr8WlrO50FdIK6pg&s",

    },
    {
      id: "3",
      product: "商品名稱商品名稱商品名稱3",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJJUgfDtA4d_ahP54YDMr8WlrO50FdIK6pg&s",

    },
    {
      id: "3",
      product: "商品名稱商品名稱商品名稱3",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJJUgfDtA4d_ahP54YDMr8WlrO50FdIK6pg&s",

    },
    {
      id: "3",
      product: "商品名稱商品名稱商品名稱3",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJJUgfDtA4d_ahP54YDMr8WlrO50FdIK6pg&s",

    },
  ])
  const [trackingImage, setTrackingImage] = useState("../../Images/track.png");

  const handleClick = () => {
    setTrackingImage(trackingImage === "../../Images/track.png" ? "../../Images/track.png" : "../../Images/untrack.png");
  };

  return (
      <div className={styles.productContainer}>
        {cards.map((productCard, i) => (
          <div key={i} className={styles.productCard}>
            <div className={styles.productInfo} >
              <div className={styles.productPic}>
                <img src={productCard.imgUrl} alt={productCard.product} className={styles.image}></img>
                <p>{productCard.product}</p>
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
        ))}
      </div>

  );
}

export default ProductCard
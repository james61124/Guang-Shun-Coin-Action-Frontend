import React from 'react'
import styles from './Product.module.css';

const Product = ({name, status, bidTime, bidPrice, imageUrl}) => {
    return (
        <div className={styles.product}>
            <div className={styles.productWrapper}>
                <div className={styles.productImage}>
                    <img src={imageUrl} className={styles.productImage}></img>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productInfoWrapper}>
                        <div className={styles.productNameAndStatus}>
                            <div className={styles.productName}>{name}</div>
                            <div className={styles.productStatus}>{status}</div>
                        </div>
                        <div className={styles.arrivedTime}>
                            <div>{bidTime}</div>
                        </div>
                        <div className={styles.price}>
                            <div>{bidPrice}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Product
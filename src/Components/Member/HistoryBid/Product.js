import React from 'react'
import styles from './Product.module.css';
import { useNavigate } from 'react-router-dom';

const Product = ({id, name, status, bidTime, bidPrice, imageUrl}) => {

    const navigate = useNavigate();
    const handleProduct = (id) => {
        navigate(`/detail/${id}`);
      };

    return (
        <div className={styles.product}>
            <div className={styles.productWrapper}>
                <div className={styles.productImage} onClick={() => handleProduct(id)}>
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
                            <div>NTD {bidPrice}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Product
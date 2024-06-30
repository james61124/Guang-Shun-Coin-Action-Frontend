import React from 'react'
import styles from './Product.module.css';

const Product = () => {
    return (
        <div className={styles.product}>
            <div className={styles.productWrapper}>
                <div className={styles.productImage}></div>
                <div className={styles.productInfo}>
                    <div className={styles.productInfoWrapper}>
                        <div className={styles.productNameAndStatus}>
                            <div className={styles.productName}>商品名稱</div>
                            <div className={styles.productStatus}>寄送中</div>
                        </div>
                        <div className={styles.arrivedTime}>
                            <div>預計抵達: 2024-04-01~2024-04-02</div>
                        </div>
                        <div className={styles.price}>
                            <div>NTD 15000元</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Product
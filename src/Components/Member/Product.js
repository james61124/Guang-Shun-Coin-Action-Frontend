import React, { useState } from 'react'
import './Product.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Product = () => {
    return (
        <div className={'product'}>
            <div className={'productWrapper'}>
                <div className={'productImage'}></div>
                <div className={'productInfo'}>
                    <div className={'productInfoWrapper'}>
                        <div className={'productNameAndStatus'}>
                            <div className="productName">商品名稱</div>
                            <div className="productStatus">寄送中</div>
                        </div>
                        <div className={'arrivedTime'}>
                            <div>預計抵達: 2024-04-01~2024-04-02</div>
                        </div>
                        <div className={'price'}>
                            <div>NTD 15000元</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Product
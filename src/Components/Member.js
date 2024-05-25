import React, { useState } from 'react'
import './Member.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Member = (props) => {
  const [email, setEmail] = useState('')

  const onButtonClick = () => {
    // You'll update this function later...
  }

  const items = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div class="mainContainer">
        <div className={'titleContainer'}>
            <div>配送進度</div>
        </div>
        
        <div className={'sortingContainer'}>
            <div className={'sortingButtom'}>
                <div className={'sortingList'}>
                    <div>商品排序</div>
                </div>
            </div>
        </div>

        <div class="infoBody">
            <div className={'indexContainer'}>
                <div class="indexList">
                    <div>追蹤商品</div>
                    <div>我的貼文</div>
                    <div>歷史出價</div>
                </div>
            </div>
            <div class="infoContainer">
                <div class="infoContainerWrapper">
                    {items.map((item, index) => (
                        <Product key={index} />
                    ))}
                </div>
            </div>
            <div className={'indexContainer'}></div>
        </div>
        
        
        
    </div>
  )
}

const Product = () => {
    return (
        <div className={'product'}>
            <div className={'productWrapper'}>
                <div className={'productImage'}></div>
                <div className={'productInfo'}>
                    <div className={'productInfoWrapper'}>
                        <div className={'productName'}>
                            <div>商品名稱</div>
                            <div className={'productStatus'}>
                                <div>寄送中</div>
                            </div>
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

export default Member
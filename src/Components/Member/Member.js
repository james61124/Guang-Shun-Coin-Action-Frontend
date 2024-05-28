import React, { useState } from 'react'
import './Member.css';
import downSelect from '../../Images/down-select.png';
import Product from './Product';
import Pagination from './Pagination';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Member = (props) => {
  const [email, setEmail] = useState('')
  const totalPages = 100;
  const pageRangeDisplayed = 5;
  const handlePageChange = (pageNumber) => {
    console.log(`Current page is ${pageNumber}`);
  };

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
      setSelectedValue(event.target.value);
  };

  const onButtonClick = () => {
    // You'll update this function later...
  }

  const items = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div class="mainContainer">
        <div className={'titleContainer'}>
            <div>歷史出價</div>
        </div>
        
        <div className={'sortingContainer'}>
            <div className={'sortingButtom'}>
                <div className={'sortingList'} >
                    <select id="sorting" value={selectedValue} onChange={handleChange}>
                        <option value="">請選擇</option>
                        <option value="option1">熱門程度</option>
                        <option value="option2">追蹤清單</option>
                        <option value="option3">選項3</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="infoBody">
            <div className={'indexContainer'}>
                <div class="indexList">
                    <div class="indexItemWrapper">
                        <div class="indexItem">追蹤商品</div>
                        <div class="indexItem">我的貼文</div>
                        <div class="indexItem">歷史出價</div>
                    </div>
                </div>
            </div>
            <div class="infoContainer">
                <div class="infoContainerWrapper">
                    {items.map((item, index) => (
                        <div>
                            <Product key={index} />
                            <div class="productGap"></div>
                        </div>
                        
                    ))}
                    <Pagination
                        totalPages={totalPages}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <div className={'indexContainer'}></div>
        </div>
    </div>
  )
}


export default Member
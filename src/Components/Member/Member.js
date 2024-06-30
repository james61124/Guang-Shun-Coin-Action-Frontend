import React, { useState } from 'react'
import styles from './Member.module.css';
import Product from './Product';
import Pagination from './Pagination';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Member = (props) => {
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
    <div class={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <div>歷史出價</div>
        </div>
        
        <div className={styles.sortingContainer}>
            <div className={styles.sortingButtom}>
                <div className={styles.sortingList}>
                    <select id="sorting" value={selectedValue} onChange={handleChange}>
                        <option value="">請選擇</option>
                        <option value="option1">熱門程度</option>
                        <option value="option2">追蹤清單</option>
                        <option value="option3">選項3</option>
                    </select>
                </div>
            </div>
        </div>

        <div class={styles.infoBody}>
            <div className={styles.indexContainer}>
                <div class={styles.indexList}>
                    <div class={styles.indexItemWrapper}>
                        <Link class={styles.indexItem} to="/login">我的貼文</Link>
                        <Link class={styles.indexItem} to="/member">歷史出價</Link>
                    </div>
                </div>
            </div>
            <div class={styles.infoContainer}>
                <div class={styles.infoContainerWrapper}>
                    {items.map((item, index) => (
                        <div>
                            <Product key={index} />
                            <div class={styles.productGap}></div>
                        </div>
                        
                    ))}
                    <Pagination
                        totalPages={totalPages}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <div className={styles.indexContainer}></div>
        </div>
        <Routes>
            <Route path="/member" element={<Member/>} />
        </Routes>
    </div>
  )
}


export default Member
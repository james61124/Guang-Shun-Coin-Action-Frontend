import React, { useState, useEffect } from 'react'
import styles from './HistoryBid.module.css';
import Product from './Product';
import Pagination from './Pagination';
import { BrowserRouter as Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config/config';

const HistoryBid = (props) => {

    const pageRangeDisplayed = 5;
    const [selectedValue, setSelectedValue] = useState('');
    const [totalPages, setTotalPages] = useState(0)
    const [history, setHistory] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const { backendUrl } = config;

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const data = {
	        "sorting": selectedValue,
            "page": pageNumber
        };

        try {
            const response = await axios.post(`${backendUrl}/member/getHistoryBid`, data, config);
        if (response && response.data && response.data.Data) {
            console.log(response)
            const historyData = response.data.Data.map(history => ({
                productID: history.productID,
                productName: history.productName,
                bidPrice: history.bidPrice,
                bidTime: history.bidTime,
                status: history.status.String,
                imageUrl: `${backendUrl}${history.imageUrl.String}`
            }));
            setHistory(historyData);
            console.log(historyData)
        } else {
            setHistory([]);
        }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }

    const fetchPages = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const data = {};

        try {
            const response = await axios.post(`${backendUrl}/member/totalPagesOfHistoryBid`, data, config);
            if (response && response.data && response.data.Data) {
                setTotalPages(response.data.Data.total)
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setPageNumber(pageNumber);
        fetchHistory();
        fetchPages();
    };

    useEffect(() => {
        fetchHistory();
        fetchPages();
    }, []);    

    const items = Array.from({ length: 4 }, (_, index) => index);

    return (
        <div class={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>歷史出價</div>
            </div>
            
            {/* <div className={styles.sortingContainer}>
                <div className={styles.sortingButtom}>
                    <div className={styles.sortingList}>
                        <select id="sorting" value={selectedValue} onChange={handleChange}>
                            <option value="priceIncrease">出價金額遞增</option>
                            <option value="priceDecrease">出價金額遞減</option>
                            <option value="timeIncrease">出價時間遞增</option>
                            <option value="timeDecrease">出價時間遞減</option>
                            <option value="nameIncrease">商品名稱遞增</option>
                            <option value="nameDecrease">商品名稱遞減</option>
                        </select>
                    </div>
                </div>
            </div> */}

            <div class={styles.infoBody}>
                {/* <div className={styles.indexContainer}>
                    <div class={styles.indexList}>
                        <div class={styles.indexItemWrapper}>
                            <Link class={styles.indexItem} to="/historyBid">歷史出價</Link>
                            <Link class={styles.indexItem} to="/historyBid">得標商品</Link>
                            <Link class={styles.indexItem} to="/historyBid">我的商品</Link>
                            <Link class={styles.indexItem} to="/editMember">編輯資訊</Link>
                            <Link class={styles.indexItem} to="/editPassword">修改密碼</Link>
                        </div>
                    </div>
                </div> */}
                
                <div class={styles.infoContainer}>
                    <div class={styles.infoContainerWrapper}>
                        {history.map((product, i) => (
                            <div key={i}>
                                <Product 
                                    id={product.productID}
                                    name={product.productName} 
                                    status={product.status}
                                    bidTime={product.bidTime} 
                                    bidPrice={product.bidPrice} 
                                    imageUrl={product.imageUrl} 
                                />
                                <div className={styles.productGap}></div>
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
        </div>
    )
}


export default HistoryBid
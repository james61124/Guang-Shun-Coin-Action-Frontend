import React, { useState, useEffect } from 'react'
import styles from './HistoryBid.module.css';
import Product from './Product';
import Pagination from './Pagination';
import axios from 'axios';
import config from '../../../config/config';
import { useNavigate } from 'react-router-dom';

const HistoryBid = (props) => {

    const pageRangeDisplayed = 5;
    const [selectedValue, setSelectedValue] = useState('');
    const [totalPages, setTotalPages] = useState(0)
    const [history, setHistory] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const { backendUrl } = config;
    const navigate = useNavigate();

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
            console.log(response)
            if (response.data.Message == "user didn't login") {
                navigate('/login');
            } else if (response && response.data && response.data.Data) {
                const historyData = response.data.Data.getBidHistory.map(history => ({
                    productID: history.productID,
                    productName: history.productName,
                    bidPrice: history.bidPrice,
                    bidTime: history.bidTime,
                    status: history.status.String,
                    imageUrl: `${backendUrl}${history.imageUrl.String}`
                }));
                setHistory(historyData);
                setTotalPages(response.data.Data.totalPages);
            } else {
                setHistory([]);
            }
        } catch (error) {
                console.error('Failed to fetch products:', error);
        }
    }

    const handlePageChange = (pageNumber) => {
        setPageNumber(pageNumber);
    };

    useEffect(() => {
        fetchHistory();
    }, [pageNumber]);    

    const items = Array.from({ length: 4 }, (_, index) => index);

    return (
        <div class={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>歷史出價</div>
            </div>
            <div class={styles.infoBody}>              
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
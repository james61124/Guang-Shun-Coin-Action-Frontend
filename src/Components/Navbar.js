import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Product from './Product';

const Navbar = () => {
    // Example state usage with useState hook
    const [isActive, setIsActive] = useState(false);

    return (
        <Router>
            <div>
                <div  className={styles.navList} >
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">會員專區</Link>
                            </li>
                            <li>
                                <Link to="/login">客服中心</Link>
                            </li>
                            <li>
                                <Link to="/login">討論區</Link>
                            </li>
                            <li>
                                <Link to="/product">商品總覽</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/product" element={<Product/>} />
                </Routes>
                
            </div>
        </Router>
    );
};

export default Navbar;
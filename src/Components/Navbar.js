import React, { useState } from 'react';
import './Navbar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Member from './Member';

const Navbar = () => {
    // Example state usage with useState hook
    const [isActive, setIsActive] = useState(false);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/member">會員專區</Link>
                        </li>
                        <li>
                            <Link to="/login">客服中心</Link>
                        </li>
                        <li>
                            <Link to="/login">討論區</Link>
                        </li>
                        <li>
                            <Link to="/login">商品總覽</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/Register" element={<Register/>} />
                    <Route path="/member" element={<Member/>} />
                </Routes>
                
            </div>
        </Router>
    );
};

export default Navbar;
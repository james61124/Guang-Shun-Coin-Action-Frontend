import React, { useState } from 'react';
import './Navbar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';

const Navbar = () => {
    // Example state usage with useState hook
    const [isActive, setIsActive] = useState(false);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
                
            </div>
        </Router>
    );
};

export default Navbar;
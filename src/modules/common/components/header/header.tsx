import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
    <nav className="header navbar navbar-expand-md navbar-light bg-faded">
        <div className="container-fluid">
            <Link className="mr-auto navbar-brand" to="/manage">Dashboard App</Link>
            <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse">
                <ul className="ml-sm-auto navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="/components/">Components</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

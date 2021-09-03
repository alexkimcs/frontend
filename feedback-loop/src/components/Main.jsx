import React, { useContext } from 'react';
import { DataContext } from './hidden/DataContext';
import Feed from './homeview/feed/Feed';
import Header from './homeview/header/Header';

function Main(props) {
    return (
        <div>
            <Header />
            <h1>main component</h1>
            <Feed />
        </div>
    );
}

export default Main;
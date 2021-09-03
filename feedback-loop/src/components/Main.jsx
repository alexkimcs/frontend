import React, { useContext } from 'react';
import { DataContext } from './hidden/DataContext';
import Header from './homeview/header/Header';

function Main(props) {
    return (
        <div>
            <Header />
            <h1>main component</h1>
        </div>
    );
}

export default Main;
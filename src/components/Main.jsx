import React from 'react';
import Feed from './homeview/feed/Feed';
import Header from './homeview/header/Header';

function Main(props) {
    return (
        <div>
            <Header />
            <Feed />
        </div>
    );
}

export default Main;
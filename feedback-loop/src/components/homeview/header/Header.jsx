import React from 'react';
import Searchbar from './Searchbar';
import '../../../styles/Header.css';
import UserDropdown from './UserDropdown';
import AddPost from './AddPost';
import logo from '../../../logo-5.png';


function Header(props) {
    return (
        <div className='Header'>
            <div className='logo-and-title-div'>
                <div>
                    <img className='logo' src={logo} alt='feedback-loop-logo' />
                </div>

                <div className='title'>
                    <h1 className='header-title'>Feedback Loop</h1>
                </div>


            </div>
            
            <Searchbar />
            <div className='user-header'>
                <AddPost />
                <UserDropdown />
            </div>
            
        </div>
    );
}

export default Header;
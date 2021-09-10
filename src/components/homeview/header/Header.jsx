import React, { useContext } from 'react';
import Searchbar from './Searchbar';
import '../../../styles/Header.css';
import UserDropdown from './UserDropdown';
import AddPost from './AddPost';
import logo from '../../../logo-5.png';
import { DataContext } from '../../hidden/DataContext';


function Header() {
    
    //user state from useContext
    const {thisUser} = useContext(DataContext);

    //display header
    return (
        <div className='Header'>
            <div className='logo-and-title-div'>
                <div>
                    <a className='home-link' href="/" ><img className='logo' src={logo} alt='feedback-loop-logo' /></a>
                </div>

                <div className='title'>
                    <h1 className='header-title'><a className='home-link' href="/" >Feedback Loop</a></h1>
                </div>


            </div>
            
            <Searchbar />
            {(thisUser.username === 'guest') && 
                <div className='user-header-logged-in'>
                    <UserDropdown />
                </div>
            }
            {(thisUser.username !== 'guest') &&
                <div className='user-header'>
                    <AddPost />
                    <UserDropdown />
                </div>
            }
            
        </div>
    );
}

export default Header;
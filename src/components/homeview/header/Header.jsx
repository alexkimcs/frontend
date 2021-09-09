import React, { useContext } from 'react';
import Searchbar from './Searchbar';
import '../../../styles/Header.css';
import UserDropdown from './UserDropdown';
import AddPost from './AddPost';
import logo from '../../../logo-5.png';
import { DataContext } from '../../hidden/DataContext';


function Header(props) {

    const {thisUser} = useContext(DataContext);
    return (
        <div className='Header'>
            <div className='logo-and-title-div'>
                <div>
                    <a className='home-link' href={`${URL}/posts`} ><img className='logo' src={logo} alt='feedback-loop-logo' /></a>
                </div>

                <div className='title'>
                    <h1 className='header-title'><a className='home-link' href={`${URL}/posts`} >Feedback Loop</a></h1>
                </div>


            </div>
            
            <Searchbar />
            <div className='user-header'>
                {(thisUser.username !== 'guest') &&
                    <AddPost />
                }
                
                <UserDropdown />
            </div>
            
        </div>
    );
}

export default Header;
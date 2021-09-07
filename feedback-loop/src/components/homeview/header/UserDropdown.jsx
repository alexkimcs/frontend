import React, { useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';

function UserDropdown(props) {

    const { thisUser, setLogIn } = useContext(DataContext);
    return (
        <div className='UserDropdown'>


            <button className='user-login-button' type='button' onClick={() => setLogIn(true)}>hello, {thisUser.username}</button>

        </div>
    );
}

export default UserDropdown;
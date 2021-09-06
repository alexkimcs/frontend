import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/LogInModal.css';
import { DataContext } from '../../hidden/DataContext';

function LogInModal(props) {

    const [existingUser, setExistingUser] = useState(true);
    const [usernameLogIn, setUsernameLogIn] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [noUser, setNoUser] = useState(false);

    const { thisUser, setThisUser, users, setUsers, logIn, setLogIn, initialUserState, isLoggedIn, setIsLoggedIn } = useContext(DataContext);

    const handleChange = (e) => {
        setUsernameLogIn(e.target.value);
    }

    const handleNewUsername = (e) => {
        setNewUsername(e.target.value);
    }

    const handleNewEmail = (e) => {
        setNewEmail(e.target.value);
    }

    const logOut = () => {
        setThisUser(initialUserState);
        setNoUser(false);
        setIsLoggedIn(false);
    }

    const handleExistingSubmit = () => {

        setNoUser(false);

        let thisUsername = usernameLogIn;
        setUsernameLogIn('');

        users.forEach(user => {
            if (thisUsername === user.username) {
                setThisUser(user);
                setLogIn(false);
                setIsLoggedIn(true);
            } else {
                setNoUser(true);
            }
        })
    }

    const handleNewSubmit = () => {
        let newUser = {
            username: newUsername,
            email: newEmail
        }

        axios.post('http://localhost:4000/users')
            .then(() => {
                setUsers([...users, newUser])
            })
            .then(() => {

            })
            .catch(console.error)

        
    }
 
    useEffect(() => {
        console.log(thisUser)
    }, [existingUser, thisUser, noUser, isLoggedIn])

    return (
        <div className='LogInModal'>
            <div className='modal'>
                <div className='modal-textbox'>
                    <div className='logged-in-as'>
                        <h5 className='log-in-header'>logged in as</h5>
                        <h3 className='logged-in-username'>{thisUser.username}</h3>
                    </div>
                    {!isLoggedIn && 
                        <div>
                            <div className='tabs'>
                                <button className={`existing-user-button tab-button ${(existingUser) ? 'selected' : null}`} type='button' onClick={() => setExistingUser(true)} >existing user</button>
                                <button className={`new-user-button tab-button ${(existingUser) ? null : 'selected'}`} type='button' onClick={() => setExistingUser(false)} >new user</button>
                            </div>
                            {existingUser && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' value={usernameLogIn} onChange={handleChange} />
                                    {(noUser) ? 
                                        <p className='no-user-found'>user doesn't exist</p> :
                                        <p className='no-user-found'></p>
                                    }
                                </div>
                            }
                            {!existingUser && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' value={newUsername} onChange={handleNewUsername} />
                                    <input className='existing-user-input' type='text' placeholder='email' value={newEmail} onChange={handleNewEmail} />
                                </div>
                            }
                        </div>
                    }
                    <div>
                        {isLoggedIn && 
                            <button className='cancel-button' type='button' onClick={logOut} >log out</button>
                        }
                        {!isLoggedIn && existingUser &&
                            <button className='cancel-button' type='button' onClick={handleExistingSubmit} >log in</button>
                        }
                        {!isLoggedIn && !existingUser && 
                            <button className='cancel-button' type='button' onClick={handleNewSubmit} >log in</button>
                        }
                        <button className='cancel-button' type='button' onClick={() => setLogIn(false)} >close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInModal;
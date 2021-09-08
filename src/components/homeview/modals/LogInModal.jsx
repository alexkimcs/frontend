import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/LogInModal.css';
import { DataContext } from '../../hidden/DataContext';

function LogInModal() {

    const initialLoginState = {
        username: '',
        newUsername: '',
        email: '',
        password: '',
        newPassword: '',
        verifyPassword: ''
    };
    const [loginState, setLoginState] = useState(initialLoginState);
    const [existingUserLogin, setExistingUserLogin] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);

    const { thisUser, setThisUser, setLogIn, initialUserState, isLoggedIn, setIsLoggedIn, URL } = useContext(DataContext);

    const handleChange = (event) => {
        setLoginState({ ...loginState, [event.target.id]: event.target.value });
    };

    const logOut = () => {
        setThisUser(initialUserState);
        setUserNotFound(false);
        setIsLoggedIn(false);
        localStorage.clear();
    };

    const handleExistingSubmit = async () => {
        console.log("logging in");

        let loginData = {
            username: loginState.username,
            password: loginState.password
        };

        console.log("login Data",loginData);

        axios.post(`${URL}/users/login`, loginData)
        .then((res) => {
            if (res.data){
                console.log('login succeeded')
                setThisUser({username: res.data.username, userID: res.data._id});
                localStorage.setItem('user', res.data.username)
                localStorage.setItem('userID', res.data._id)
                console.log("username", res.data.username)
                setIsLoggedIn(true);
                setUserNotFound(false);
                setLogIn(false);
            }
            else{
                setUserNotFound(true);
                console.log('login failed');
            }
        })
        
    };

    const handleNewSubmit = () => {
        console.log("creating account");
        
        if (loginState.newPassword !== loginState.verifyPassword){
            console.log("error");
        } else{
            
            const newUser = {
                username : loginState.newUsername,
                email : loginState.email,
                password : loginState.newPassword
            }

            axios.post(`${URL}/users`, newUser)
            .then((res) => {
                setThisUser({username: res.data.username, userID: res.data._id});
                localStorage.setItem('user', res.data.username)
                localStorage.setItem('userID', res.data._id)
                console.log(res.data.username)
                setIsLoggedIn(true);
                setLogIn(false);
            })
        }    
    }

    const closeModal = () => {
        setLogIn(false);
        setUserNotFound(false);
    }
 
    useEffect(() => {
        console.log("thisUser", thisUser)
    }, [existingUserLogin, thisUser, userNotFound, isLoggedIn])

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
                                <button className={`existing-user-button tab-button ${(existingUserLogin) ? 'selected' : null}`} type='button' onClick={() => setExistingUserLogin(true)} >existing user</button>
                                <button className={`new-user-button tab-button ${(existingUserLogin) ? null : 'selected'}`} type='button' onClick={() => setExistingUserLogin(false)} >new user</button>
                            </div>
                            {existingUserLogin && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' id="username" value={loginState.username} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='password' id="password" value={loginState.password} onChange={handleChange} />
                                    {(userNotFound) ? <p className='no-user-found'>login failed</p> : null }
                                </div>
                            }
                            {!existingUserLogin && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' id="newUsername" value={loginState.newUsername} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='email' id="email" value={loginState.email} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='password' id="newPassword" value={loginState.newPassword} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='verify password' id="verifyPassword" value={loginState.verifyPassword} onChange={handleChange} />
                                </div>
                            }
                        </div>
                    }
                    <div>
                        {isLoggedIn && 
                            <button className='login-form-button' type='button' onClick={logOut} >log out</button>
                        }
                        {!isLoggedIn && existingUserLogin &&
                            <button className='login-form-button' type='button' onClick={handleExistingSubmit} >log in</button>
                        }
                        {!isLoggedIn && !existingUserLogin && 
                            <button className='login-form-button' type='button' onClick={handleNewSubmit} >create account</button>
                        }
                        <button className='login-form-button' type='button' onClick={closeModal} >close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInModal;
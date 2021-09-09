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

    const initialErrorState = {
        userNotFound: false,
        passwordMismatch: false,
        duplicateUser: false
    };

    const [loginState, setLoginState] = useState(initialLoginState);
    const [existingUserLogin, setExistingUserLogin] = useState(true);
    const [errorState, setErrorState] = useState(initialErrorState);

    const { thisUser, setThisUser, setLogIn, initialUserState, isLoggedIn, setIsLoggedIn, URL } = useContext(DataContext);

    const handleChange = (event) => {
        setLoginState({ ...loginState, [event.target.id]: event.target.value });
    };

    const logOut = () => {
        setThisUser({username: 'guest', userID: ''});
        setErrorState(initialErrorState);
        setIsLoggedIn(false);
        localStorage.setItem('user', 'guest');
        localStorage.setItem('userID', '');
    };

    const handleExistingSubmit = async () => {

        let loginData = {
            username: loginState.username,
            password: loginState.password
        };

        console.log("login Data",loginData);

        axios.post(`${URL}/users/login`, loginData)
        .then((res) => {
            if (res.data){
                setThisUser(initialUserState);
                localStorage.setItem('user', res.data.username)
                localStorage.setItem('userID', res.data._id)
                setIsLoggedIn(true);
                setErrorState({userNotFound:false});
                setLogIn(false);
            }
            else{
                setErrorState({userNotFound:true});
            }
        })
        
    };

    const handleNewSubmit = () => {
        
        if (loginState.newPassword !== loginState.verifyPassword){
            setErrorState({passwordMismatch:true});
        } else{
            const newUser = {
                username : loginState.newUsername,
                email : loginState.email,
                password : loginState.newPassword
            }

            axios.post(`${URL}/users`, newUser)
            .then((res) => {
                if (!res.data.username){
                    setErrorState({duplicateUser:true});
                } else {
                    setThisUser({username: res.data.username, userID: res.data._id});
                    localStorage.setItem('user', res.data.username)
                    localStorage.setItem('userID', res.data._id)
                    setIsLoggedIn(true);
                    setLogIn(false);
                }
            })
        }    
    }

    const closeModal = () => {
        setErrorState(initialErrorState);
        setLogIn(false);
    }
 
    useEffect(() => {
        console.log("thisUser", thisUser)
    }, [existingUserLogin, thisUser, isLoggedIn])

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
                                    <input className='existing-user-input' type='password' placeholder='password' id="password" value={loginState.password} onChange={handleChange} />
                                    {(errorState.userNotFound) ? <p className='login-error'>incorrect username or password</p> : null }
                                </div>
                            }
                            {!existingUserLogin && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' id="newUsername" value={loginState.newUsername} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='email' id="email" value={loginState.email} onChange={handleChange} />
                                    <input className='existing-user-input' type='password' placeholder='password' id="newPassword" value={loginState.newPassword} onChange={handleChange} />
                                    <input className='existing-user-input' type='password' placeholder='verify password' id="verifyPassword" value={loginState.verifyPassword} onChange={handleChange} />
                                    {(errorState.passwordMismatch) ? <p className='login-error'>passwords must match</p> : null }
                                    {(errorState.duplicateUser) ? <p className='login-error'>username taken</p> : null }
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
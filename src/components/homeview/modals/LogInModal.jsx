import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/LogInModal.css';
import { DataContext } from '../../hidden/DataContext';

function LogInModal() {
    
    //template for loginState
    const initialLoginState = {
        username: '',
        newUsername: '',
        email: '',
        password: '',
        newPassword: '',
        verifyPassword: ''
    };

    //template for errorState
    const initialErrorState = {
        userNotFound: false,
        passwordMismatch: false,
        duplicateUser: false
    };

    //states to track user interaction with login
    const [loginState, setLoginState] = useState(initialLoginState);
    const [existingUserLogin, setExistingUserLogin] = useState(true);
    const [errorState, setErrorState] = useState(initialErrorState);

    //user details from useContext
    const { thisUser, setThisUser, setLogIn, initialUserState, isLoggedIn, setIsLoggedIn, URL } = useContext(DataContext);

    //store user inputs in state, matching input ids to state object properties
    const handleChange = (event) => {
        setLoginState({ ...loginState, [event.target.id]: event.target.value });
    };

    //submit login if enter key press on passsword input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleExistingSubmit();
        }
    }

    //submit login if enter key press on verify new passsword input
    const newHandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleNewSubmit();
        }
    }

    //on logout, reset states and clear localStorage
    const logOut = () => {
        setThisUser(initialUserState);
        setErrorState(initialErrorState);
        setIsLoggedIn(false);
        localStorage.clear();
    };

    //resolve login attempt for existing user
    const handleExistingSubmit = async () => {
        
        //assign inputs to object properties
        let loginData = {
            username: loginState.username,
            password: loginState.password
        };

        //attempt login matching username and password
        axios.post(`${URL}/users/login`, loginData)
        .then((res) => {
            if (res.data){
                //if login succeeeds, set user state and localStorage user
                setThisUser({username: res.data.username, userID: res.data._id});
                localStorage.setItem('user', res.data.username)
                localStorage.setItem('userID', res.data._id)

                //update login states
                setIsLoggedIn(true);
                setErrorState({userNotFound:false});
                setLogIn(false);
            }
            else{
                //if login attempt fails, show error state
                setErrorState({userNotFound:true});
            }
        })
        
    };

    //resolve login attempt for new user
    const handleNewSubmit = () => {
        
        //if password mismatch, show error state
        if (loginState.newPassword !== loginState.verifyPassword){
            setErrorState({passwordMismatch:true});
        } else{
            //if passwords match, assign inputs to object properties
            const newUser = {
                username : loginState.newUsername,
                email : loginState.email,
                password : loginState.newPassword
            }

            //attempt to add new object to user database
            axios.post(`${URL}/users`, newUser)
            .then((res) => {
                if (!res.data.username){
                    //if unable to add new user, show error state
                    setErrorState({duplicateUser:true});
                } else {
                    //if user creation succeeds, set user in state and localStorage
                    setThisUser({username: res.data.username, userID: res.data._id});
                    localStorage.setItem('user', res.data.username)
                    localStorage.setItem('userID', res.data._id)
                    setIsLoggedIn(true);
                    setLogIn(false);
                }
            })
        }    
    }
    
    //when login modal closes, reset error state and login modal display state
    const closeModal = () => {
        setErrorState(initialErrorState);
        setLogIn(false);
    }
    
    //refresh component when login or user state changes
    useEffect(() => {
        //console.log("thisUser", thisUser)
    }, [existingUserLogin, thisUser, isLoggedIn])

    //display login modal
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
                                    <input className='existing-user-input' type='password' placeholder='password' id="password" value={loginState.password} onKeyDown={handleKeyDown} onChange={handleChange} />
                                    {(errorState.userNotFound) ? <p className='login-error'>incorrect username or password</p> : null }
                                </div>
                            }
                            {!existingUserLogin && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' id="newUsername" value={loginState.newUsername} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='email' id="email" value={loginState.email} onChange={handleChange} />
                                    <input className='existing-user-input' type='password' placeholder='password' id="newPassword" value={loginState.newPassword} onChange={handleChange} />
                                    <input className='existing-user-input' type='password' placeholder='verify password' id="verifyPassword" value={loginState.verifyPassword} onKeyDown={newHandleKeyDown} onChange={handleChange} />
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
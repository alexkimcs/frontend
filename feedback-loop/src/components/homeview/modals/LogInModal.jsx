import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/LogInModal.css';
import { DataContext } from '../../hidden/DataContext';

function LogInModal() {

    const initialLoginState ={
        loggedIn: false,
        username: '',
        email: '',
        password: '',
        verifyPassword: ''
    }

    const [loginState, setLoginState] = useState(initialLoginState);
    const [existingUserLogin, setExistingUserLogin] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);

    const { thisUser, setThisUser, users, setUsers, setLogIn, initialUserState, isLoggedIn, setIsLoggedIn } = useContext(DataContext);

    const handleChange = (event) => {
        setLoginState({ ...loginState, [event.target.id]: event.target.value });
    };

    const logOut = () => {
        setThisUser(initialUserState);
        setUserNotFound(false);
        setIsLoggedIn(false);
    }

    const handleExistingSubmit = async () => {
        console.log("logging in");
    }

    // const handleSubmit = () => {
    //     let newPost = {
    //         username: thisUser.username,
    //         title: titleValue,
    //         body: bodyValue
    //     }

    //     axios.post('http://localhost:4000/posts', newPost)
    //         .then(getPosts());

    //     setTitleValue('');
    //     setBodyValue('');
    //     setAddPost(false);

    // }

    const handleNewSubmit = async () => {
        console.log("creating account");
        
        if (loginState.password !== loginState.verifyPassword){
            console.log("error");
        } else{
            
            const newUser = {
                username : loginState.username,
                email : loginState.email,
                password : loginState.password
            }

            axios.post('http://localhost:4000/users', newUser).then((res) => {
                setThisUser(res.data);
                localStorage.setItem('user', res.data.username)
                console.log(res.data.username)
            })

        }    

    }
 
    useEffect(() => {
        console.log(thisUser)
    }, [existingUserLogin, thisUser, userNotFound, loginState.loggedIn])

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
                                    {(userNotFound) ? <p className='no-user-found'>user doesn't exist</p> : null }
                                </div>
                            }
                            {!existingUserLogin && 
                                <div className='input-div'>
                                    <input className='existing-user-input' type='text' placeholder='username' id="username" value={loginState.username} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='email' id="email" value={loginState.email} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='password' id="password" value={loginState.password} onChange={handleChange} />
                                    <input className='existing-user-input' type='text' placeholder='verify password' id="verifyPassword" value={loginState.verifyPassword} onChange={handleChange} />
                                </div>
                            }
                        </div>
                    }
                    <div>
                        {loginState.loggedIn && 
                            <button className='login-form-button' type='button' onClick={logOut} >log out</button>
                        }
                        {!loginState.loggedIn && existingUserLogin &&
                            <button className='login-form-button' type='button' onClick={handleExistingSubmit} >log in</button>
                        }
                        {!loginState.loggedIn && !existingUserLogin && 
                            <button className='login-form-button' type='button' onClick={handleNewSubmit} >create account</button>
                        }
                        <button className='login-form-button' type='button' onClick={() => setLogIn(false)} >close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInModal;
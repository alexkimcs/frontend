import './App.css';
import { useState, useEffect } from 'react';
import { DataContext } from './components/hidden/DataContext';
import Main from './components/Main';
import NewPostModal from './components/homeview/modals/NewPostModal';
import axios from 'axios';
import LogInModal from './components/homeview/modals/LogInModal';

function App() {
  
  //template object for user interaction state
  const initialInteractionState = {
    currentlyViewing: null,
    currentlyEditing: null,
    searchValue: '',
  }

  //looking forward phyton homie!

  //template object for user state
  const initialUserState = {
    username: 'guest',
    userID: ''
  }
  
  //reference to backend url
  // const URL = "https://feedbackloopbackend.herokuapp.com"; 
  const URL = "http://localhost:4000"
  
  //states to track user login and interactions
  const [interactionState, setInteractionState] = useState(initialInteractionState);
  const [postsState, setPostsState] = useState(null);
  const [users, setUsers] = useState(null);
  const [thisUser, setThisUser] = useState(initialUserState);
  const [addPost, setAddPost] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //get all posts from database and displays the newest posts first
  function getPosts() {
    axios.get(`${URL}/posts`)
      .then(res => {
        setPostsState(res.data.reverse());
        })
      .catch(console.error);
  }

  //get all users from database
  function getUsers() {
    axios.get(`${URL}/users`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(console.error);
  }

  //check whether there is a user in localstorage
  function checkSessionUser() {
    const sessionUser = localStorage.getItem("user");
    const sessionID = localStorage.getItem("userID");
    if (sessionUser && sessionID) {
      setThisUser({...thisUser, username: sessionUser, userID: sessionID});
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  
  //display how long ago a post was created
  const displayTime = (time) => {
    
    //get time post was created from the function parameter
    let postTime = {
      year: new Date(time).getFullYear(),
      month: new Date(time).getMonth(),
      day: new Date(time).getDate(),
      hour: new Date(time).getHours(),
      minute: new Date(time).getMinutes(),
      second: new Date(time).getSeconds()
    }

    //get current time
    let viewTime = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      second: new Date().getSeconds()
    }

    //compare post creation time and current time to display post age
    if (viewTime.year === postTime.year) {
      if (viewTime.month === postTime.month) {
        if (viewTime.day === postTime.day) {
          if (viewTime.hour === postTime.hour) {
            if (viewTime.minute === postTime.minute) {
              if ((viewTime.second - postTime.second) < 30 ) {
                return 'just now'
              } else {
                let diff = viewTime.second - postTime.second;
                return `${diff} s`;
              }
            } else {
              let diff = viewTime.minute - postTime.minute;
              return `${diff} m`;
            }
          } else {
            let diff = viewTime.hour - postTime.hour;
            return `${diff} h`;
          }
        } else {
          if ((viewTime.day - postTime.day === 1) && (viewTime.hour < postTime.hour)) {
            let diff = (viewTime.hour + 24) - postTime.hour;
            return `${diff} h`
          } else {
            let diff = viewTime.day - postTime.day;
            return `${diff} d`;
          }
        }
      } else {
        let diff = viewTime.month - postTime.month;
        return `${diff} m`;
      }
    } else {
      let diff = viewTime.year - postTime.year;
      return `${diff} y`;
    }
  }

  //on load, get all posts and users
  //then check if there is a session user logged in
  useEffect(() => {
    getPosts();
    getUsers();
    checkSessionUser();
  }, []);

    displayTime("2021-09-06T19:40:40.481Z");

  return (
    <div className="App">
      <DataContext.Provider value={{
        interactionState,
        setInteractionState,
        postsState,
        setPostsState,
        addPost,
        setAddPost,
        users,
        setUsers,
        thisUser, 
        setThisUser,
        logIn, 
        setLogIn, 
        initialUserState,
        isLoggedIn, 
        setIsLoggedIn,
        getPosts, 
        displayTime,
        URL
      }}>
        {addPost &&
          <NewPostModal />
        }
        {logIn &&
          <LogInModal />
        }
        <Main />
      </DataContext.Provider>
    </div>
  );
}

export default App;

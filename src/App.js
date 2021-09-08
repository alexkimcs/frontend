import './App.css';
import { useState, useEffect } from 'react';
import { DataContext } from './components/hidden/DataContext';
import Main from './components/Main';
import NewPostModal from './components/homeview/modals/NewPostModal';
import axios from 'axios';
import LogInModal from './components/homeview/modals/LogInModal';

function App() {
  const initialInteractionState = {
    currentlyViewing: null,
    currentlyEditing: null,
    searchValue: '',
  }

  const initialUserState = {
    username: 'guest',
    email: ''
  }
  // const URL = "https://feedbackloopbackend.herokuapp.com"
  const URL = "http://localhost:4000"
  const [interactionState, setInteractionState] = useState(initialInteractionState);
  const [postsState, setPostsState] = useState(null);
  const [users, setUsers] = useState(null);
  const [thisUser, setThisUser] = useState(initialUserState);
  const [addPost, setAddPost] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('THIS USER', thisUser)
  
    function getPosts() {
        axios.get(`${URL}/posts`)
            .then(res => {
                console.log(res.data);
                setPostsState(res.data);
            })
            .catch(console.error);
    }

    function getUsers() {
      axios.get(`${URL}/users`)
        .then(res => {
          console.log(res.data)
          setUsers(res.data);
        })
        .catch(console.error);
    }


    function checkSessionUser() {
      const sessionUser = localStorage.getItem("user");
      const sessionID = localStorage.getItem("userID");
      if (sessionUser) {
        setThisUser({...thisUser, username: sessionUser, id: sessionID});
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    const displayTime = (time) => {
      
      let postTime = {
        year: new Date(time).getFullYear(),
        month: new Date(time).getMonth(),
        day: new Date(time).getDate(),
        hour: new Date(time).getHours(),
        minute: new Date(time).getMinutes(),
        second: new Date(time).getSeconds()
      }

      let viewTime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds()
      }

      
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
            let diff = viewTime.day - postTime.day;
            return `${diff} d`;
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

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


  // const initialPostsState = {
  //   posts: [],
  //   postsTotal: 0,
  //   trendingTopics: [],
  // }
  
  const [interactionState, setInteractionState] = useState(initialInteractionState);
  const [postsState, setPostsState] = useState(null);
  const [users, setUsers] = useState(null);
  const [thisUser, setThisUser] = useState(initialUserState);
  const [addPost, setAddPost] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    function getPosts() {
        axios.get('http://localhost:4000/posts')
            .then(res => {
                setPostsState(res.data);
            })
            .catch(console.error);
    }

    function getUsers() {
      axios.get('http://localhost:4000/users')
        .then(res => {
          setUsers(res.data);
        })
        .catch(console.error);
    }

    useEffect(() => {
        getPosts();
        getUsers();
    }, []);

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
        setIsLoggedIn
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

import './App.css';
import { useState, useEffect } from 'react';
import { DataContext } from './components/hidden/DataContext';
import Main from './components/Main';
import axios from 'axios';

function App() {
  const initialInteractionState = {
    currentlyViewing: null,
    currentlyEditing: null,
    searchValue: '',
  }

  const dummyPosts = [
    {
        "user":"Cole",
        "title": "React",
        "body": "Thinking about the advantage of use context over params.  What do you prefer?",
        "likes": 2,
        "comments": ["great post"]
    },
    {
        "user":"Michael",
        "title": "React",
        "body": "Thinking about the advantage of use context over params.  What do you prefer?",
        "likes": 2,
        "comments": ["not sure"]
    },
    {
        "user":"Menty",
        "title": "React",
        "body": "Thinking about the advantage of use context over params.  What do you prefer?",
        "likes": 3,
        "comments": []
    },
    {
        "user":"Nita",
        "title": "React",
        "body": "Thinking about the advantage of use context over params.  What do you prefer?",
        "likes": 4,
        "comments": ["yes","no"]
    }
];

  // const initialPostsState = {
  //   posts: [],
  //   postsTotal: 0,
  //   trendingTopics: [],
  // }
  
  const [interactionState, setInteractionState] = useState(initialInteractionState);
  const [postsState, setPostsState] = useState(null);
  
    function getPosts() {
        axios.get('http://localhost:4000/posts')
            .then(res => {
                setPostsState(res.data);
            })
            .catch(console.error);
    }

    useEffect(() => {
        getPosts();
    }, []);

  return (
    <div className="App">
      <DataContext.Provider value={{
        interactionState,
        setInteractionState,
        postsState,
        setPostsState
      }}>
        <Main />
      </DataContext.Provider>
    </div>
  );
}

export default App;

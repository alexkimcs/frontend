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

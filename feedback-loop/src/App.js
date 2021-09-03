import './App.css';
import { useState } from 'react';
import { DataContext } from './components/hidden/DataContext';
import Main from './components/Main';

function App() {
  const initialInteractionState = {
    currentlyViewing: null,
    currentlyEditing: null,
    searchValue: '',
  }

  const initialPostsState = {
    posts: [],
    postsTotal: 0,
    trendingTopics: [],
  }
  
  const [interactionState, setInteractionState] = useState(initialInteractionState);
  const [postsState, setPostsState] = useState(initialPostsState);

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

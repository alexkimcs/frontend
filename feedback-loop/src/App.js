import './App.css';
import { DataContext } from './components/hidden/DataContext';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <DataContext.Provider>
        <Main />
      </DataContext.Provider>
    </div>
  );
}

export default App;

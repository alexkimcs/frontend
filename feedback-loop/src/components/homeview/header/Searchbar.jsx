import React, { useState, useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';

function Searchbar(props) {
    const { interactionState, setInteractionState } = useContext(DataContext);

    const [searchItem, setSearchItem] = useState('');
    
    const handleChange = (e) => {
        setSearchItem(e.target.value);
    }

    const handleSubmit = () => {
        setInteractionState({...interactionState, searchValue: searchItem});
        setSearchItem('');
    }
    return (
      
        <div className='Searchbar'>
       
            <input className='searchbar-input' type='text' placeholder='search by: tags, posts, users' value={searchItem} onChange={handleChange} />
            <button className='searchbar-submit' type='button' onClick={handleSubmit}><span className='fas fa-search'></span></button>

            
        </div>
        
        
    );
}

export default Searchbar;
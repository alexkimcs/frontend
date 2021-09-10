import React, { useState, useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';
import axios from 'axios';

function Searchbar() {
    
    //setposts state from useContext
    const { setPostsState, URL} = useContext(DataContext);

    //state to store search item as string
    const [searchItem, setSearchItem] = useState('');
    
    //store changes to search item in state
    const handleChange = (e) => {
        setSearchItem(e.target.value);
    }
    
    //submit search when if enter key pressed on text input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    //filter posts by search term on submit
    const handleSubmit = () => {
        axios.get(`${URL}/filter/?search=${searchItem}`)
            .then(res => {
                setPostsState(res.data.reverse());
                setSearchItem('');
            })
            .catch(console.error);
    }

    //display search bar
    return (
        <div className='Searchbar'>
            <input className='searchbar-input' type='text' placeholder='search by: tags, posts, users' value={searchItem} onKeyDown={handleKeyDown} onChange={handleChange} />
            <button className='searchbar-submit' type='button' onClick={handleSubmit}><span className='fas fa-search'></span></button>
        </div>
    );
}

export default Searchbar;
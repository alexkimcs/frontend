import React, { useState, useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';
import axios from 'axios';

function Searchbar(props) {
    const { setPostsState, URL} = useContext(DataContext);

    const [searchItem, setSearchItem] = useState('');
    
    const handleChange = (e) => {
        setSearchItem(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        axios.get(`${URL}/filter/?search=${searchItem}`)
            .then(res => {
                setPostsState(res.data.reverse());
                setSearchItem('');
            })
            .catch(console.error);
    }

    return (
        <div className='Searchbar'>
            <input className='searchbar-input' type='text' placeholder='search by: tags, posts, users' value={searchItem} onKeyDown={handleKeyDown} onChange={handleChange} />
            <button className='searchbar-submit' type='button' onClick={handleSubmit}><span className='fas fa-search'></span></button>
        </div>
    );
}

export default Searchbar;
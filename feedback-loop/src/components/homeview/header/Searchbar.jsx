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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
             <div class="container-fluid">
             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
             </button>
        <div className='Searchbar'><span class='fas fa-search'></span>
        <div className='Cancel-icon'><span class='fas fa-times'></span>
            <input className='searchbar-input' type='text' placeholder='search by: tags, posts, users' value={searchItem} onChange={handleChange} />
            {/* <button className='searchbar-submit' type='button' onClick={handleSubmit}>SEARCH</button> */}

            <button className='searchbar-submit' class='fas fa-search fa-1x ' type='button' onClick={handleSubmit}></button>

        </div>
        </div>
        </div>
        </nav>
    );
}

export default Searchbar;
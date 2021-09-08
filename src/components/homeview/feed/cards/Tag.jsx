import React, { useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../../hidden/DataContext';

function Tag({tag}) {

    const { URL, setPostsState } = useContext(DataContext);

    const searchTags = () => {
        axios.get(`${URL}/filter/?search=${tag}`)
            .then(res => {
                setPostsState(res.data.reverse());
            })
            .catch(console.error);
    }


    return (
        <div className='Tag' onClick={searchTags}>
            <p>{tag}</p>
        </div>
    );
}

export default Tag;
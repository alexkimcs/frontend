import React, { useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../../hidden/DataContext';

//tag string passed as props
function Tag({tag}) {
    //import post details from useContext
    const { URL, setPostsState } = useContext(DataContext);

    //When a tag is clicked, run a search for posts matching the tag
    const searchTags = () => {
        axios.get(`${URL}/filter/?search=${tag}`)
            .then(res => {
                setPostsState(res.data.reverse());
            })
            .catch(console.error);
    }

    //display the tag
    return (
        <div className='Tag' onClick={searchTags}>
            <p>{tag}</p>
        </div>
    );
}

export default Tag;
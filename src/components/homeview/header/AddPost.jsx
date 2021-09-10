import React, { useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';

function AddPost() {
    
    //addPost state from useContext
    const { setAddPost } = useContext(DataContext);
    
    //diplay add post button
    return (
        <div className='AddPost'>
            <button className='add-post-button' type='button' onClick={() => setAddPost(true)}>new post</button>
        </div>
    );
}

export default AddPost;
import React, { useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';

function AddPost(props) {

    const { addPost, setAddPost } = useContext(DataContext);

    return (
        <div className='AddPost'>
            <button className='add-post-button' type='button' onClick={() => setAddPost(true)}>new post</button>
        </div>
    );
}

export default AddPost;
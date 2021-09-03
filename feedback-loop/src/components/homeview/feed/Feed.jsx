import React, { useState, useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';
import PostCard from './cards/PostCard';


function Feed(props) {
    const { postsState, setPostsState } = useContext(DataContext);
    if (postsState) {
        return (
        <div className='Feed'>
            {postsState.map((post) => {
                return <PostCard post={post} />
            })}
        </div>
        ) 
    } else {
        return (
        <div className='Feed'>
            <h2>loading posts...</h2>
        </div>
        )
    }
    
}

export default Feed;
import React, { useEffect, useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';
import PostCard from './cards/PostCard';


function Feed(props) {
    const { postsState } = useContext(DataContext);

    useEffect(() => {
    }, [postsState])

    if (postsState) {
        return (
        <div className='Feed'>
            {postsState.map((post) => {
                return <PostCard
                    key={post._id} post={post} 
                />
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
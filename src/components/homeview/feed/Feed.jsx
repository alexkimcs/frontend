import React, { useEffect, useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';
import PostCard from './cards/PostCard';

function Feed() {
    const { postsState } = useContext(DataContext);
    
    //reload feed when postState is updated
    useEffect(() => {
        //console.log(postsState)
    }, [postsState])

    //if no posts in postState (because a search yielded no matches) display message
    if (postsState) {
        if (postsState.length === 0) {
            return (
                <div className='Feed-no-results'>
                    <h3>No results found</h3>
                    <h3>Try another search</h3>
                </div>
            )
        } else {
            //otherwise, display all posts
           return (
                <div className='Feed'>
                    {postsState.map((post) => {
                        return <PostCard
                            key={post._id} post={post} 
                        />
                    })}
                </div>
            )  
        }
    } else {
        //if post state is null (no backend server response) display loading message
        return (
        <div className='Feed-no-results'>
            <h2>loading posts...</h2>
        </div>
        )
    }
    
}

export default Feed;
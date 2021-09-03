import React, { useContext } from 'react';
import { DataContext } from '../../hidden/DataContext';
import PostCard from './cards/PostCard';


function Feed(props) {
    const { postsState, setPostsState } = useContext(DataContext);
    return (
        <div className='Feed'>
            {postsState.posts.map((post) => {
                return <PostCard post={post} />
            })}
        </div>
    );
}

export default Feed;
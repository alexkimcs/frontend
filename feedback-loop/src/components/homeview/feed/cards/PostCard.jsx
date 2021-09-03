import React from 'react';
import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';
import '../../../../styles/PostCard.css';

function PostCard({ post }) {
    console.log(post)
    return (
        <div className='PostCard'>
            <PostHeader author={post.user} title={post.title}/>
            <PostBody body={post.body}/>
            <hr />
            <PostInteractions likes={post.likes} comments={post.comments}/>
        </div>
    );
}

export default PostCard;
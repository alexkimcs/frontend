import React from 'react';
import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';
import '../../../../styles/PostCard.css';
import Tag from './Tag';

function PostCard({ post }) {

    console.log(post)
    return (
        <div className='PostCard'>
            <PostHeader author={post.username} title={post.title} time={post.createdAt} />
            <PostBody body={post.body}/>
            <p className='tags-list'>tags: {post.tags.map(tag => {return <Tag key={tag} tag={tag} /> })}</p>
            <hr />
            <PostInteractions id={post._id} likes={post.likes} comments={post.comments}/>
        </div>
    );
}

export default PostCard;
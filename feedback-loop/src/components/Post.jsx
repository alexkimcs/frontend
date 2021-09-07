import React from 'react';

function Post({post}) {

    return(
        <div>
            <p>{post.username}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
        </div>
    );
}
    

export default Post;
import React from 'react';

//post passed as props
function Post({post}) {

    //display this post
    return(
        <div>
            <p>{post.username}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
        </div>
    );
}
    

export default Post;
import React from 'react';

function PostBody({ body }) {
    return (
        <div className='PostBody'>
            <p className='body-text'>{body}</p>
        </div>
    );
}

export default PostBody;
import React from 'react';

function Comment({comment}) {
    return (
        <div className='comment-item'>
            <p className='comment-text'>{comment}</p>
        </div>
    );
}

export default Comment;
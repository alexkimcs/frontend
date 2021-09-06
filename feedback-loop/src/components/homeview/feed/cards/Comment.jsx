import React from 'react';

function Comment({comment}) {

    return (
        <div className='comment-item'>
            <p className='comment-text'>{comment.username} <span style={{fontStyle: 'italic', fontSize: 'xx-small'}}>said</span> {comment.body}</p>
            <p classnmae='comment-timestamp'></p>
        </div>
    );
}

export default Comment;
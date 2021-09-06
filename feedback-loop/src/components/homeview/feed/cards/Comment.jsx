import React from 'react';

function Comment({comment}) {

    return (
        <div className='comment-item'>
            <h4 className='comment-text'>{comment.username} <span style={{fontStyle: 'italic', fontSize: 'small'}}>said</span> : </h4>
            <p className='comment-body'>{comment.body}</p>
            <p classnmae='comment-timestamp'></p>
        </div>
    );
}

export default Comment;
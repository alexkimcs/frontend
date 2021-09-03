import React from 'react';


function PostHeader({title, author}) {
    return (
        <div className='PostHeader'>
            <h2 className='post-title'>{title}</h2>
            <h5 className='post-author'><span style={{fontStyle: 'italic', fontSize: 'xx-small'}}>authored by</span> {author}</h5>
        </div>
    );
}

export default PostHeader;
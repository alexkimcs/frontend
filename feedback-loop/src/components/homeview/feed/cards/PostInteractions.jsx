import React from 'react';

function PostInteractions({ likes, comments }) {

    const handleClickLike = (e) => {
        (e.target.className === 'fas fa-heart like-icon') ?
        e.target.className = 'far fa-heart like-icon' :
        e.target.className = 'fas fa-heart like-icon' ;
    }
    
    return (
        <div className='PostInteractions'>
            <div className='interactions-div'>
                <div className='likes-div'>
                    <button className='like-button'><i onClick={handleClickLike} className="far fa-heart like-icon"></i></button>
                    <h4 className='likes-num'>{likes}</h4>
                </div>
                <button className='comment-button' >comment</button>
            </div>
            
            <hr />
            <div className='comments-div'>
                {comments.map((comment)=> {
                    return (
                        <div className='comment-item'>
                            <p className='comment-text'>{comment}</p>
                        </div>
                    )
                })}
            </div>
            
            
        </div>
    );
}

export default PostInteractions;
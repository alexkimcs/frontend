import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

function PostInteractions({ id, likes, comments }) {

    const [postLikes, setPostLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    const [addNew, setAddNew] =useState(false);
    const [commentText, setCommentText] = useState('');
    

    const handleClickLike = (e) => {
        let thisLike = isLiked;
        setIsLiked(!thisLike);

        // (thisLike) ?
        // e.targetclassName = "fas fa-heart like-icon" :
        // e.targetclassName = "far fa-heart like-icon" ;

        let tmp = parseInt(postLikes)
        let newLikes = thisLike ? tmp - 1 : tmp + 1
        setPostLikes(newLikes)
        
        axios.put(`http://localhost:4000/posts/${id}`, {likes: newLikes});
        
    }

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    }

    const createComment = () => {
        let newComments = comments;
        newComments.push(commentText);

        axios.put(`http://localhost:4000/posts/${id}`, {comments: newComments});

        setAddNew(false);
        setCommentText('');
    }
    


    useEffect(() => {
    }, [id, postLikes, addNew])

    return (
        <div className='PostInteractions'>
            <div className='interactions-div'>
                <div className='likes-div'>
                    <button className='like-button'><i onClick={handleClickLike} className={`${(isLiked) ? "fas" : "far"} fa-heart like-icon`}></i></button>
                    <h4 className='likes-num'>{postLikes}</h4>
                </div>
                <button className='comment-button' onClick={() => setAddNew(true)} >comment</button>
            </div>
            
            <hr />
            <div className='comments-div'>
                {comments.map((comment)=> {
                    return <Comment key={id + '-comment-' + (comments.indexOf(comment) + 1)}comment={comment} />
                })}
                {addNew &&
                    <div className='comment-item'>
                        <input type='text' placeholder='add comment here' value={commentText} onChange={handleCommentChange} />
                        <button type='button' onClick={createComment}>post</button>
                    </div>
                }
            </div>
            
            
        </div>
    );
}

export default PostInteractions;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { DataContext } from '../../../hidden/DataContext';

function PostInteractions({ id, likes, comments }) {

    const { thisUser, URL, setPostsState } = useContext(DataContext);

    const [postLikes, setPostLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    const [addNew, setAddNew] =useState(false);
    const [commentText, setCommentText] = useState('');
    const [noInteraction, setNoInteraction] = useState(false);
    
    const checkLikes = () => {
        axios.get(`${URL}/posts`)
            .then(res => {
                let thisPost = res.data.find(post => post._id === id);
                let thisPostLikes = thisPost.likes;
                let liked = thisPostLikes.some(like => like.id === thisUser.userID);
                setIsLiked(liked)
            })
    }

    const handleClickLike = (e) => {

        // (thisLike) ?
        // e.targetclassName = "fas fa-heart like-icon" :
        // e.targetclassName = "far fa-heart like-icon" ;

        // let tmp = postLikes

        if (thisUser.username === 'guest') {
            setNoInteraction(true);
            window.setTimeout(() => {
                setNoInteraction(false);
            }, 2000)
        } else {
            if (isLiked) {
                let newLikes = [...postLikes]
                let index = newLikes.indexOf({id: thisUser.userID, username: thisUser.username});
                newLikes.splice(index, 1);
                setPostLikes(newLikes);
                
                axios.put(`${URL}/posts/${id}`, {likes: newLikes})
                    .then(res => {
                        setIsLiked(false)
                        setPostsState(res.data.reverse());
                    })
            } else {
                let newLikes = [...postLikes]
                newLikes.push({id: thisUser.userID, username: thisUser.username})
                setPostLikes(newLikes)
                
                axios.put(`${URL}/posts/${id}`, {likes: newLikes})
                    .then(res => {
                        setIsLiked(true)
                        setPostsState(res.data.reverse());
                    })
            }
        }
    }

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    }

    const createComment = () => {
        let newComment = {
            username: thisUser.username,
            body: commentText
        }

        let newComments = comments;
        newComments.push(newComment);

        axios.put(`${URL}/posts/${id}`, {comments: newComments});

        setAddNew(false);
        setCommentText('');
    }
    


    useEffect(() => {
        checkLikes();
    }, [id, postLikes, addNew, thisUser])

    return (
        <div className='PostInteractions'>
            <div className='interactions-div'>
                <div className='likes-div'>
                    {(isLiked)
                        ? <button className='like-button'><i onClick={handleClickLike} className='fas fa-heart like-icon'></i></button>
                        : <button className='like-button'><i onClick={handleClickLike} className='far fa-heart like-icon'></i></button>
                    }
                    <h4 className='likes-num'>{(postLikes === []) ? 0 : postLikes.length}</h4>
                    {noInteraction &&
                        <p className='no-interaction'>must be logged in to interact with posts</p>
                    }
                </div>
                {(thisUser.username !== 'guest') &&
                    <button className='comment-button' onClick={() => setAddNew(true)} ><span className='fas fa-pen-fancy'></span></button>
                }
                
            </div>
            
            <hr />
            <div className='comments-div'>
                {addNew &&
                    <div className='comment-item'>
                        <input className='new-comment-input' type='text' placeholder='add comment here' value={commentText} onChange={handleCommentChange} />
                        <button className='add-new-comment-button' type='button' onClick={createComment}><span className='fas fa-plus'></span></button>
                        <button className='cancel-comment-button' type='button' onClick={() => setAddNew(false)}><span className='fas fa-ban'></span></button>
                    </div>
                }
                {comments.map((comment)=> {
                    return <Comment key={id + '-comment-' + (comments.indexOf(comment) + 1)} comment={comment} id={id} />
                })}
            </div>
            
            
        </div>
    );
}

export default PostInteractions;
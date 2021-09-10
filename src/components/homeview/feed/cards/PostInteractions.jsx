import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { DataContext } from '../../../hidden/DataContext';

//post details passed as props
function PostInteractions({ id, likes, comments }) {
    
    //import user and post details from usecontext
    const { thisUser, URL, setPostsState } = useContext(DataContext);

    //state to track user interactions with this post
    const [postLikes, setPostLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    const [addNew, setAddNew] =useState(false);
    const [commentText, setCommentText] = useState('');
    const [noInteraction, setNoInteraction] = useState(false);
    
    //get likes count from database
    const checkLikes = () => {
        axios.get(`${URL}/posts`)
            .then(res => {
                let thisPost = res.data.find(post => post._id === id);
                let thisPostLikes = thisPost.likes;
                let liked = thisPostLikes.some(like => like.id === thisUser.userID);
                setIsLiked(liked)
            })
    }

    //update likes locally and in database when post is liked
    const handleClickLike = (e) => {

        //prevent guests from liking posts
        if (thisUser.username === 'guest') {
            setNoInteraction(true);
            window.setTimeout(() => {
                setNoInteraction(false);
            }, 2000)
        } else {
            //if this user has already liked the post, they unlike it
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
                //if this user has not liked the post, they like it
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

    //store comment changes in state
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    }
    
    //update comments when submitted
    const createComment = () => {
        
        //add inputs to object
        let newComment = {
            username: thisUser.username,
            body: commentText
        }

        //add new comment object to array of comments
        let newComments = comments;
        newComments.push(newComment);

        //add new comment to database
        axios.put(`${URL}/posts/${id}`, {comments: newComments});
        
        //reset states
        setAddNew(false);
        setCommentText('');
    }

    //submit comment when enter key is pressed in text input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            createComment();
        }
    }

    //check likes when there is a change in state
    useEffect(() => {
        checkLikes();
    }, [id, postLikes, addNew, thisUser])

    //diplay comments array
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
                        <input className='new-comment-input' type='text' placeholder='add comment here' value={commentText} onChange={handleCommentChange} onKeyDown={handleKeyDown} />
                        <button className='add-new-comment-button' type='button' onClick={createComment}><span className='fas fa-plus'></span></button>
                        <button className='cancel-comment-button' type='button' onClick={() => setAddNew(false)} ><span className='fas fa-ban'></span></button>
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
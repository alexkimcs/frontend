import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../../hidden/DataContext';

//comment and owner id passed as props
function Comment({comment, id}) {
    
    //states from useContext
    const { thisUser, URL, setPostsState } = useContext(DataContext);
    
    //states to track comment edits
    const [editComment, setEditComment] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);

    //toggle state for whether comment is being edited
    const editCommentClick = () => {
        setEditComment(!editComment);
    }

    //when comment is edited, store the input value in state
    const handleEdit = (e) => {
        setEditedComment({...editedComment, body: e.target.value})
    }

    //when edits are submitted, update the comments property of the relevant post
    const submitEdit = () => {
        let newComment = editedComment;
        
        //find post in database, splice this comment into comment array
        axios.get(`${URL}/posts/`)
            .then(res => {
                let thisPost = res.data.find(post => post._id === id);
                let theseComments = thisPost.comments;
                let thisComment = theseComments.find(aComment => aComment.body === comment.body);
                let thisIndex = theseComments.indexOf(thisComment);
                theseComments.splice(thisIndex, 1, newComment);
                axios.put(`${URL}/posts/${id}`, {comments: theseComments})
                    .then(res => {
                        setEditComment(false);
                        setEditedComment(comment);
                        axios.get(`${URL}/posts`)
                            .then(res => setPostsState(res.data.reverse()))
                    })
                    .catch(console.error);

            })
            .catch(console.error)
    }

    const deleteComment = () => {
        axios.get(`${URL}/posts/`)
            .then(res => {
                let thisPost = res.data.find(post => post._id === id);
                let theseComments = thisPost.comments;
                let thisComment = theseComments.find(aComment => aComment.body === comment.body);
                let thisIndex = theseComments.indexOf(thisComment);
                theseComments.splice(thisIndex, 1);
                axios.put(`${URL}/posts/${id}`, {comments: theseComments})
                    .then(res => {
                        setEditComment(false);
                        setEditedComment(comment);
                        axios.get(`${URL}/posts`)
                            .then(res => setPostsState(res.data.reverse()))
                    })
                    .catch(console.error);

            })
            .catch(console.error)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitEdit();
        }
    }

    if (!editComment) {
        return (
        <div className='comment-item'>
            <div>
                <h4 className='comment-text'>{comment.username} <span style={{fontStyle: 'italic', fontSize: 'small'}}>said</span> : </h4>
                <p className='comment-body'>{comment.body}</p>
            </div>
            {(comment.username === thisUser.username) &&
                <div className='comment-edit-buttons'>
                    <button className='edit-comment-button' type='button' onClick={editCommentClick}><span className='far fa-edit'></span></button> 
                    <button className='delete-comment-button' type='button' onClick={deleteComment}><span className='far fa-trash-alt'></span></button> 
                </div>
            }
            
        </div>
        );
    } else {
        return (
            <div className='comment-item'>
                <input className='new-comment-input' type='text' placeholder='add comment here' value={editedComment.body} onChange={handleEdit} onKeyDown={handleKeyDown} />
                <button className='submit-edit-comment-button' type='button' onClick={submitEdit} ><span className='fas fa-plus'></span></button>
                <button className='cancel-edit-comment-button' type='button' onClick={editCommentClick} ><span className='fas fa-ban'></span></button>
            </div>
        )
    }
    
}

export default Comment;
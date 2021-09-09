import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../../hidden/DataContext';

function Comment({comment, id}) {

    const { thisUser, URL, setPostsState } = useContext(DataContext);

    const [editComment, setEditComment] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);

    const editCommentClick = () => {
        setEditComment(!editComment);
    }

    const handleEdit = (e) => {
        setEditedComment({...editedComment, body: e.target.value})
    }

    const submitEdit = () => {
        let newComment = editedComment;

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

    if (!editComment) {
        return (
        <div className='comment-item'>
            <div>
                <h4 className='comment-text'>{comment.username} <span style={{fontStyle: 'italic', fontSize: 'small'}}>said</span> : </h4>
                <p className='comment-body'>{comment.body}</p>
                <p classnmae='comment-timestamp'></p>
            </div>
            {(comment.username === thisUser.username) &&
                <div>
                    <button className='edit-comment-button' type='button' onClick={editCommentClick}><span className='far fa-edit'></span></button> 
                    <button className='delete-comment-button' type='button' onClick={deleteComment}><span className='far fa-trash-alt'></span></button> 
                </div>
            }
            
        </div>
        );
    } else {
        return (
            <div className='comment-item'>
                <input className='new-comment-input' type='text' placeholder='add comment here' value={editedComment.body} onChange={handleEdit} />
                <button className='new-comment-button' type='button' onClick={submitEdit}>save</button>
                <button className='new-comment-button' type='button' onClick={editCommentClick} >cancel</button>
            </div>
        )
    }
    
}

export default Comment;
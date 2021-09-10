import React, { useContext, useState } from 'react';
import { DataContext } from '../../hidden/DataContext';
import '../../../styles/EditPostModal.css';
import axios from 'axios';

//post and edit modal toggle passed as props
function EditPostModal({post, setShowEditModal}) {
    
    //postState from useContext
    const {setPostsState, URL } = useContext(DataContext);

    //object template for edited post state
    const initialEditPostState = {
        title: post.title,
        body: post.body,
        tags: post.tags.join(', ')
    }

    //state to store edited title, body, and tags
    const [editedPost, setEditedPost] = useState(initialEditPostState);

    //store post edits in state
    const handleChange = (e) => {
        setEditedPost({...editedPost, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        
        //details of edited post stored in object
        let editedPostObj = {
            title: editedPost.title,
            body: editedPost.body,
            tags: editedPost.tags.split(', ')
        }

        //update post object in database
        axios.put(`${URL}/posts/${post._id}`, editedPostObj)
        .then((res) => {
            setPostsState(res.data.reverse());
        })

        //reset state
        setEditedPost(initialEditPostState);
        setShowEditModal(false);
    }

    //display edit post modal
    return (
        <div className='EditPostModal'>
            <div className='modal'>
                <div className='modal-textbox'>
                    
                    <div className='form'>
                        <input className='title-input' id='title' type='text' placeholder='title' value={editedPost.title} onChange={handleChange}/>
                        <textarea className='body-input' id='body' rows='10' cols='30' placeholder='say what you need to say, use backticks (`) for code blocks' value={editedPost.body} onChange={handleChange}/>
                        <div className='tags'>
                            <div>
                                <label htmlFor='tag-input'>enter tags separated by commas</label>
                                <input className='tag-input' id='tags' name='tag-input' type='text' placeholder='e.g. javscript, react, components' value={editedPost.tags} onChange={handleChange} />
                                
                            </div>
                            
                        </div>
                        <div className='form-buttons'>
                            <button className='edit-post-submit-button' type='button' onClick={handleSubmit}>submit</button>
                            <button className='cancel-button' type='button' onClick={() => setShowEditModal(false)} >cancel</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPostModal;
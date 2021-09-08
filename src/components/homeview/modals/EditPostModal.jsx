import React, { useContext, useState } from 'react';
import { DataContext } from '../../hidden/DataContext';
import '../../../styles/EditPostModal.css';
import axios from 'axios';

function EditPostModal({post, setShowEditModal}) {

    const {setPostsState, URL } = useContext(DataContext);

    const initialEditPostState = {
        title: post.title,
        body: post.body,
        tags: post.tags.join(', ')
    }

    const [editedPost, setEditedPost] = useState(initialEditPostState);

    const handleChange = (e) => {
        setEditedPost({...editedPost, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {

        let editedPostObj = {
            title: editedPost.title,
            body: editedPost.body,
            tags: editedPost.tags.split(', ')
        }

        console.log('edited post', editedPost)
        console.log('edited post obj', editedPostObj)

        axios.put(`${URL}/posts/${post._id}`, editedPostObj)
        .then((res) => {
            setPostsState(res.data.reverse());
        })

        setEditedPost(initialEditPostState);
        setShowEditModal(false);

    }

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
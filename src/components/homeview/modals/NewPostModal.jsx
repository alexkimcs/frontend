import React, { useContext, useState } from 'react';
import { DataContext } from '../../hidden/DataContext';
import '../../../styles/NewPostModal.css';
import axios from 'axios';

function NewPostModal(props) {

    const { setAddPost, thisUser, setPostsState, URL } = useContext(DataContext);

    const initialNewPostState = {
        title: '',
        body: '',
        tags: ''
    }

    const [newPost, setNewPost] = useState(initialNewPostState);

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.id]: e.target.value})
        console.log(newPost);
    }

    const handleSubmit = () => {
        let thisOwner = '';
        if (thisUser.username !== 'guest') {
            thisOwner = thisUser.userID;
        }

        let newPostObj = {
            username: thisUser.username,
            title: newPost.title,
            body: newPost.body,
            tags: newPost.tags.split(', '),
            owner: thisOwner
        }

        axios.post(`${URL}/posts`, newPostObj)
        .then((res) => {
            setPostsState(res.data.reverse());
        })
        setNewPost(initialNewPostState);
        setAddPost(false);
    }

    return (
        <div className='NewPostModal'>
            <div className='modal'>
                <div className='modal-textbox'>
                    
                    <div className='form'>
                        <input className='title-input' id='title' type='text' placeholder='title' value={newPost.title} onChange={handleChange}/>
                        <textarea className='body-input' id='body' rows='10' cols='30' placeholder='say what you need to say, use backticks (`) for code blocks' value={newPost.body} onChange={handleChange}/>
                        <div className='tags'>
                            <div>
                                <label htmlFor='tag-input'>enter tags separated by commas</label>
                                <input className='tag-input' id='tags' name='tag-input' type='text' placeholder='e.g. javscript, react, components' value={newPost.tags} onChange={handleChange} />
                                
                            </div>
                            
                        </div>
                        <div className='form-buttons'>
                            <button className='new-post-submit-button' type='button' onClick={handleSubmit}>submit</button>
                            <button className='cancel-button' type='button' onClick={() => setAddPost(false)} >cancel</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPostModal;
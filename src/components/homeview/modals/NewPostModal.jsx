import React, { useContext, useState } from 'react';
import { DataContext } from '../../hidden/DataContext';
import '../../../styles/NewPostModal.css';
import axios from 'axios';

function NewPostModal() {

    //post and user states from useContext
    const { setAddPost, thisUser, setPostsState, URL } = useContext(DataContext);

    //template object for newPostState
    const initialNewPostState = {
        title: '',
        body: '',
        tags: ''
    }

    //state to track user interactions with the modal
    const [newPost, setNewPost] = useState(initialNewPostState);

    //store user inputs in state
    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.id]: e.target.value})
        console.log(newPost);
    }

    //resolve new post submission
    const handleSubmit = () => {
        let thisOwner = '';
        
        //if a user is logged in, identify them as the post's owner
        if (thisUser.username !== 'guest') {
            thisOwner = thisUser.userID;
        }

        //assign user inputs to object properties
        let newPostObj = {
            username: thisUser.username,
            title: newPost.title,
            body: newPost.body,
            tags: newPost.tags.split(', '),
            owner: thisOwner
        }

        //get all posts and display them from newest to oldest
        axios.post(`${URL}/posts`, newPostObj)
        .then((res) => {
            setPostsState(res.data.reverse());
        })

        //reset states
        setNewPost(initialNewPostState);
        setAddPost(false);
    }

    //display new post modal
    return (
        <div className='NewPostModal'>
            <div className='modal'>
                <div className='modal-textbox'>
                    
                    <div className='form'>
                        <input className='title-input' id='title' type='text' placeholder='title' value={newPost.title} onChange={handleChange} required/>
                        <textarea className='body-input' id='body' rows='10' cols='30' placeholder='say what you need to say, use backticks (`) for code blocks' value={newPost.body} onChange={handleChange} required />
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
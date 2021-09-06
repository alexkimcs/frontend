import React, { useContext, useState } from 'react';
import { DataContext } from '../../hidden/DataContext';
import '../../../styles/NewPostModal.css';
import axios from 'axios';

function NewPostModal(props) {

    const { setAddPost, thisUser, getPosts } = useContext(DataContext);

    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    }

    const handleBodyChange = (e) => {
        setBodyValue(e.target.value);
    }

    const handleSubmit = () => {
        let newPost = {
            username: thisUser.username,
            title: titleValue,
            body: bodyValue
        }

        axios.post('http://localhost:4000/posts', newPost)
            .then(getPosts());

        setTitleValue('');
        setBodyValue('');
        setAddPost(false);

    }

    return (
        <div className='NewPostModal'>
            <div className='modal'>
                <div className='modal-textbox'>
                    
                    <div className='form'>
                        <input className='title-input' type='text' placeholder='title' value={titleValue} onChange={handleTitleChange}/>
                        <textarea className='body-input' rows='10' cols='30' placeholder='say what you need to say' value={bodyValue} onChange={handleBodyChange}/>
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
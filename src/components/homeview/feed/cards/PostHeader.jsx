import React, { useContext } from 'react';
import { DataContext } from '../../../hidden/DataContext';


function PostHeader({title, author, time}) {

    const { displayTime } = useContext(DataContext);

    return (
        <div className='PostHeader'>
            <h2 className='post-title'>{title}</h2>
            <div className='post-header-info'>
               <h3 className='post-author'><span style={{fontStyle: 'italic', fontSize: 'small'}}>posted by</span> {author}</h3>
               <h3 className='post-time'>{displayTime(time)}</h3> 
            </div>
            
        </div>
    );
}

export default PostHeader;
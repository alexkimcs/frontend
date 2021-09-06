import React, { useContext } from 'react';
import { DataContext } from '../../../hidden/DataContext';


function PostHeader({title, author, time}) {

    const { displayTime } = useContext(DataContext);

    return (
        <div className='PostHeader'>
            <h2 className='post-title'>{title}</h2>
            <div className='post-header-info'>
               <h5 className='post-author'><span style={{fontStyle: 'italic', fontSize: 'xx-small'}}>authored by</span> {author}</h5>
               <h5 className='post-time'>{displayTime(time)}</h5> 
            </div>
            
        </div>
    );
}

export default PostHeader;
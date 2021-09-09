import React, { useState } from 'react';

function PostBody({ body }) {

    const processBody = (text) => {
        let split = text.split('`');
        if (split[split.length - 1] === '') {
            split.pop();
        }
        return split;
    }

    let splitBody = '';

    if (body.includes('`')) {
        splitBody = processBody(body);
    }
    
    if (body.includes('`')) {
        return (
            <div className='PostBody-row'>
                <p className='body-text'>
                {splitBody.map(sub => {
                    if (splitBody.indexOf(sub) % 2 === 0) {
                        return <span key={sub}>{sub}</span>
                    } else {
                        return <span key={sub} className='code-block'>{sub}</span>
                    }
                    })
                }
                </p>
            </div>
        );
    } else {
       return (
        <div className='PostBody'>
            <p className='body-text'>{body}</p>
        </div>
        ); 
    }
    
}

export default PostBody;
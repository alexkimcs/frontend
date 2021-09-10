import React from 'react';

//body passed as props
function PostBody({ body }) {
    //split post body at backticks to isolate code blocks
    const processBody = (text) => {
        let split = text.split('`');
        if (split[split.length - 1] === '') {
            split.pop();
        }
        return split;
    }

    let splitBody = '';
    //check body for backticks
    if (body.includes('`')) {
        splitBody = processBody(body);
    }
    
    //wrap codeblocks in a span if they are present
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
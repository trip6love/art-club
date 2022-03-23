//user will create new comment
import React, { useState } from 'react'; 

import { useMutation } from '@apollo/client'; 
import { ADD_COMMENT } from '../../src/utils/mutations'; 
import { QUERY_POST } from '../../src/utils/queries';

const CommentForm = ({postId}) => {
    const [commentBody, setBody] = useState(''); 
    const [characterCount, setCharacterCount] = useState(0); 

    const [addComment, { error }] = useMutation(ADD_COMMENT, {
        //refresh the new list
        update(cache, {data: { addComment } }) {
            try {
                //could potentially not exist yet
                const { comments } = cache.readQuery({ query: QUERY_POST }); 
                cache.writeQuery({
                    query: QUERY_POST, 
                    data: { posts: [addComment, ...comments] },
                });
            } catch (e) {
                console.log(e);
            } 
        },
    });

    //handle text input change
    const handleCommChange = event => {
        if (event.target.value.length <= 280) {
          setBody(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    //adds comments to post comments[]
    const handleFormSubmit = async (event) => {
        try {
            //add comment to database
            await addComment({
                variables: { postId, commentBody },
            });

            //clear form value
            setBody('');
            setCharacterCount(0);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div class="create-post">
                <div class="create-post-header">
                    <h2 class="create-post-title" id="post-header-title"> Add a Comment</h2>
                </div>
                <form id="create-form" class="create-post-form" name="form">

                    <div class="create-post-content">
                        <label className={`${characterCount === 280 || error ? 'text-error' : ''}`}>
                            Character Count: {characterCount}/280
                            {error && <span className=''>Something Went Wrong</span>}
                        </label>
                        <textarea name="post" 
                            id="post-text" 
                            class="create-post-textarea scroller"
                            placeholder="Add your comment here.."
                            value={commentBody}
                            onChange={handleCommChange}
                        ></textarea>
                    </div>

                    <div class="create-post-actions post-actions">
                        <div class="post-actions-create">
                            <button class="btn post-actions-publish" onClick={ () => handleFormSubmit()}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default CommentForm;

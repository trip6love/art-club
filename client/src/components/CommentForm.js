//user will create new comment
import React, { useState } from 'react'; 

import { useMutation } from '@apollo/client'; 
import { ADD_COMMENT } from '../../src/utils/mutations'; 

const CommentForm = ({ commentId }) => {
    const [commentBody, setBody] = useState(''); 
    const [characterCount, setCharacterCount] = useState(0); 
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (event) => {
        if (event.target.value.length <= 500) {
            setBody(event.target.value); 
            setCharacterCount(event.target.value.length); 
        }
    }; 

    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        try {
            await addComment({
                variables: { commentBody, commentId }, 
            });

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
                <h2 class="create-post-title" id="post-header-title"> Create A Comment</h2>
                </div>
            </div>

            <form id="create-form" class="create-post-form" name="form">

                <div class="create-post-content">
                    <textarea name="post" 
                    id="post-title" 
                    class="create-post-textarea scroller"
                    placeholder="Post Title">
                    </textarea>
                </div>

                <div class="create-post-content">
                <textarea name="post" 
                id="post-text" 
                class="create-post-textarea scroller"
                placeholder="Add your comment here..">
                </textarea>
                </div>

                <div class="create-post-actions post-actions">

                <div class="post-actions-create">
                    <button class="btn post-actions-publish">Submit</button>
                </div>

                </div>

            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default CommentForm;

//This will be the form that allows users to create post
import React, { useState } from 'react'; 

import { useMutation } from '@apollo/client'; 
import { ADD_POST } from '../../src/utils/mutations'; 
import { QUERY_POST, QUERY_USER } from '../../src/utils/queries'; 

const PostForm = () => {

    const [postText, setText] = useState(''); 
    const [postTitle, setTitle] = useState('');
    const [postImage, setImage] = useState('');

    const [titleCount, setTitleCount] = useState(0); 
    const [textCount, setTextCount] = useState(0);
    
    const [addPost, {error}] = useMutation(ADD_POST, {

        update(cache, {data: { addPost } }) {

            try {
                const { posts } = cache.readQuery({ query: QUERY_POST }); 
                cache.writeQuery({
                    query: QUERY_POST,
                    data: { posts: [addPost, ...posts] },
                });
            } catch (e) {
                console.error(e); 
            }

            const { user } = cache.readQuery({ query: QUERY_USER }); 
            cache.writeQuery({
                query: QUERY_USER, 
                data: { user: { ...user, posts: [...user.posts, addPost ] } },
            });
        },
    });

    //countes their postText length to make sure it's less 280
    const handleTextChange = (event) => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setTextCount(event.target.value.length); 
        }
    };

    //countes their postTitle length to make sure it's less 280
    const handleTitleChange = (event) => {
        if (event.target.value.length <= 20) {
            setTitle(event.target.value);
            setTitleCount(event.target.value.length); 
        }
    };

    //adds the post to user posts[]
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        try {
            await addPost({
                variables: { postText },
            });

            setText('');
            //setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div class="create-post">
                <div class="create-post-header">
                    <h2 class="create-post-title" id="post-header-title"> Create A Post</h2>
                </div>

                <form id="create-form" class="create-post-form" name="form">

                    <div class="create-post-content">
                        <textarea name="post" 
                            id="post-title" 
                            class="create-post-textarea scroller"
                            placeholder="Post Title"
                            value={postTitle}
                            onChange={handleTitleChange}
                        ></textarea>
                    </div>

                    <div class="create-post-content">
                        <textarea name="post" 
                            id="post-text" 
                            class="create-post-textarea scroller"
                            placeholder="Add your text here.."
                            value={postText}
                            onChange={handleTextChange}
                        ></textarea>
                    </div>

                    <div class="create-post-actions post-actions">
                        <div class="post-actions-attachments">
                            <button type="button" class="btn post-actions-upload attachments-btn">
                                <label for="upload-image" class="post-actions-label">Upload Image</label>
                            </button>
                            <input type="file" id="upload-image" accept="image/*" multiple></input>
                        </div>

                        <div class="post-actions-create">
                            <button class="btn post-actions-publish" onSubmit={handleFormSubmit}>Submit</button>
                        </div>
                    </div>
                </form>

            </div>

            {error && <div>Something went wrong...</div>}
        </div>
      );
};

export default PostForm; 

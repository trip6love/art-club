//This will be the form that allows users to create post
import React, { useState } from 'react'; 

import { useMutation } from '@apollo/client'; 
import { ADD_POST } from '../../src/utils/mutations'; 
import { QUERY_ME, QUERY_POSTS } from '../../src/utils/queries'; 

const PostForm = () => {

    const [postText, setText] = useState(''); 
    const [postTitle, setTitle] = useState('');
    const [postImage, setImage] = useState('');

    const [titleCount, setTitleCount] = useState(0); 
    const [textCount, setTextCount] = useState(0);
    
    const [addPost, {error}] = useMutation(ADD_POST, {
        //update the new list
        update(cache, {data: { addPost } }) {
            try {
                //could potentially not exist yet
                const { posts } = cache.readQuery({ query: QUERY_POSTS }); 
                cache.writeQuery({
                    query: QUERY_POSTS, 
                    data: { posts: [addPost, ...posts] },
                });
            } catch (e) {
                console.log(e);
            }  

            //update me object's cache, appending new post to end of array
            const { me } = cache.readQuery({query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: {...me, posts: [...me.posts, addPost]}}
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
        //event.preventDefault(); 
        console.log("buttonclick");

        try {
            //add post to database
            await addPost({
                variables: { postTitle, postText, postImage },
            });
            console.log(postTitle, postText);

            //clear form value
            setText('');
            setTitle('');
            setTextCount(0);
            setTitleCount(0);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className="create-post">
                <div className="create-post-header">
                    <h2 className="create-post-title" id="post-header-title"> Create A Post</h2>
                </div>

                <form id="create-form" className="create-post-form" name="form">

                    <div className="create-post-content">
                        <label className={`${titleCount === 280 || error ? 'text-error' : ''}`}>
                            Character Count: {titleCount}/20
                            {error && <span className=''>Something Went Wrong</span>}
                        </label>
                        <textarea name="post" 
                            id="post-title" 
                            className="create-post-textarea scroller"
                            placeholder="Post Title"
                            value={postTitle}
                            onChange={handleTitleChange}
                        ></textarea>
                    </div>

                    <div className="create-post-content">
                        <label className={`${titleCount === 280 || error ? 'text-error' : ''}`}>
                            Character Count: {textCount}/280
                            {error && <span className=''>Something Went Wrong</span>}
                        </label>
                        <textarea name="post" 
                            id="post-text" 
                            className="create-post-textarea scroller"
                            placeholder="Add your text here.."
                            value={postText}
                            onChange={handleTextChange}
                        ></textarea>
                    </div>

                    <div className="create-post-actions post-actions">
                        <div className="post-actions-attachments">
                            <button type="button" className="btn post-actions-upload attachments-btn">
                                <label className="post-actions-label">Upload Image</label>
                            </button>
                            <input type="file" id="upload-image" accept="image/*" multiple></input>
                        </div>

                        <div className="post-actions-create">
                            <button type="button" className="btn post-actions-publish" onClick={ () => handleFormSubmit()}>Submit</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
      );
};

export default PostForm; 

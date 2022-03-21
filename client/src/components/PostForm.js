//This will be the form that allows users to create post
import Rearct, { useState } from 'react'; 

import { useMutation } from '@apollo/client'; 
import { ADD_POST } from '../../src/utils/mutations'; 
import { QUERY_POST, QUERY_USER } from '../../src/utils/queries'; 

const PostForm = () => {
    const [postText, setText] = useState(''); 
    const [characterCount, setCharacterCount] = useState(0); 
    
    const [addPost, {error}] = useMutation(ADD_POST, {
        update(cache, {data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POST }); 
                cache.writeQuery({
                    query: QUERY_POST,
                    data: { posts: [addPost, ...posts] },
                });
            }catch (e) {
                console.error(e); 
            }

            const { user } = cache.readQuery({ query: QUERY_USER }); 
            cache.writeQuery({
                query: QUERY_USER, 
                data: { user: { ...user, posts: [...user.posts, addPost ] } },
            });
        },
    });

    const handleChange = (event) => {
        if (event.target.value.length <= 500) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length); 
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        try {
            await addPost({
                variables: { postText },
            });

            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
          <p
            className={`m-0 ${characterCount === 500 || error ? 'text-error' : ''}`}
          >
            Character Count: {characterCount}/500
            {error && <span className="ml-2">Error</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}
          >
            <textarea
              placeholder="Write a Post.."
              value={postText}
              className="form-input col-12 col-md-9"
              onChange={handleChange}
            ></textarea>
            <button className="btn col-12 col-md-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
};

export default PostForm; 
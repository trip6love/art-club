import React from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { DELETE_POST } from '../utils/mutations';
import Auth from '../utils/auth';

//This returns all of the post
const PostList = ({ posts, title }) => {
  const [deletePost, {error}] = useMutation(DELETE_POST);

  const handleRemovePost = async (postId) => {
    try {
      const {data} = await deletePost({
        variables: {postId}
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (!posts.length) {
    return <h3 align="center" className='nopost'>No Posts Yet</h3>;
  }

  return (
    <div className='create-post'>
      <div className='create-post-header'>
      <h3 className="create-post-title" id="post-header-title">{title}</h3>
      </div>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="">
            <p className="create-posted-header">

              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700}}
                className="create-user-header"
              >
                {post.username}
              </Link>
              <p className='padding-fix-comment'> 
              posted on {post.createdAt}
              </p>
            </p>
            <div className="">
              <Link to={`/post/${post._id}`}>
                <h4 className='create-post-textarea scroller'>{post.postTitle}</h4>
                <p className='post'>{post.postText}</p>
                
                <p className="create-posted-header">
                  Comments: {post.commentCount} || Click to{' '}
                  {post.commentCount ? 'see' : 'start'} the discussion!
                </p>
                
              </Link>
            </div>
              <button className="btn attachments-btn" onClick={ () => handleRemovePost(post._id)}>Delete</button>
                          <div className='spacer'>
            </div>
          </div>
          
        ))}
    </div>
    
  );
  
};

export default PostList;


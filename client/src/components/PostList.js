import React from 'react';
import { Link } from 'react-router-dom';

//This returns all of the post
const PostList = ({ posts, title }) => {
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
                className=""
              >
                {post.username}
              </Link>
              posted on {post.createdAt}
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
          </div>
        ))}
    </div>
  );
};

export default PostList;


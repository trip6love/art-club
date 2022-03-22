import React from 'react';
import { Link } from 'react-router-dom';

//This returns all of the post
const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h3 align="center">No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="">
            <p className="">

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
                <h4>{post.postTitle}</h4>
                <p>{post.postText}</p>
                <p className="">
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


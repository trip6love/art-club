import React from 'react';
import { Link } from 'react-router-dom';

//returns all the comments for a post
const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
        <div align="center" className="card-header">
            <span  className="text-light">Comments</span>
        </div>

        <div align="center" className="card-body">
            {comments &&
            comments.map(comment => (
                <p className="comments" key={comment._id}>
                  {comment.commentBody} {'// '}
                  <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700}}>
                    {comment.username} on {comment.createdAt}
                  </Link>
                </p>
            ))}
        </div>

    </div>
  );
};

export default CommentList;
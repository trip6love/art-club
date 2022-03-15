import React from 'react';
//import { Link } from 'react-router-dom';

//returns all the comments for a post
const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-light">Comments</span>
        </div>
        <div className="card-body">
            {comments &&
            comments.map(comment => (
                <p className="pill mb-3" key={comment._id}>
                {comment.commentBody} {'// '}
                {comment.username}{'// '} {comment.createdAt}
                </p>
            ))}
        </div>
    </div>
  );
};

export default CommentList;
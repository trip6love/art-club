import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation} from '@apollo/client';
import { DELETE_COMMENT } from '../utils/mutations';

//returns all the comments for a post
const CommentList = ({ pName, pId, comments }) => {

  const [deleteComment, {error}] = useMutation(DELETE_COMMENT);

  const handleRemoveComment = async (postId, commentId) => {
    try {
      const {data} = await deleteComment({
        variables: {postId, commentId}
      });
    } catch (err) {
      console.log(err);
    }
  }


  //sets allowDelete button to display on users personal profile
  const allowDelete = (commentName) => {
    if(Auth.loggedIn() && Auth.getProfile().data.username === commentName){
      console.log(commentName);
      return true;
    }
  }

  console.log(Auth.getProfile().data.username);
  
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-light">Comments</span>
        </div>

        <div className="card-body">
            {comments &&
            comments.map(comment => (
              <div>
                <p className="pill mb-3" key={comment._id}>
                  {comment.commentBody} {'// '}
                  <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700}}>
                    {comment.username} on {comment.createdAt}
                  </Link>
                </p>
                <div>
                  {allowDelete(comment.username)? (
                    <button className="btn attachments-btn" onClick={ () => handleRemoveComment(pId, comment._id)}>Delete</button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
        </div>

    </div>
  );
};

export default CommentList;
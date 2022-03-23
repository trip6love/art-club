//has comment form

import { useParams } from 'react-router-dom';
import Auth from '../../src/utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const SinglePost = props => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
    return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {post.username}
                    </span>{' '}
                    post on {post.createdAt}
                </p>
                <div className="card-body">
                    <p>{post.postTitle}</p>
                    <p>{post.postText}</p>
                </div>
            </div>
            {post.commentCount > 0 && <CommentList pName={post.username} pId={post._id} comments={post.comments} />}
            {Auth.loggedIn() && <CommentForm postId={post._id} />}
        </div>
    );
};

export default SinglePost;
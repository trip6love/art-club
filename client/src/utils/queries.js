import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query posts($username: String){
        posts(username: $username) {
        _id
        postTitle
        postText
        CreatedAt
        username
        commentCount
        comments {
            _id
            createdAt
            username
            commentBody
            }
        }
    }
`;
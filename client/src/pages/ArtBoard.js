import React from 'react';
import PostList from '../components/PostList';

import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

//Displays All of the post an other information

const Artboard = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (   
        
        <main>
           
            <div class="">
            <div class="postlist">
                {loading ? (
                <div>Loading...</div>
                ) : (
                //calls poslist componete to view all post
                <PostList posts={posts} title="Some Posts ..." />
                )}
            </div>
            </div>
        </main>
    );
};

export default Artboard;
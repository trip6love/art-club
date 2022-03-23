import { Redirect, useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import InspirationList from '../components/InspirationList';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

// url: /profile/<username> will display other profiles
//url: /profile will display loggedin user profile
const Profile = () => {

  const { username: userParam } = useParams();

  //checks to see what url is clicked on
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  //sets allowDelete button to display on users personal profile
  const allowDelete = (user) => {
    if(Auth.loggedIn() && Auth.getProfile().data.username === user){
      return true;
    }
  } 

  console.log(userParam);
  console.log(Auth.getProfile().data.username);

  //redirects if they are logged in and url /profile/<loggedinuser>
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />; 
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  //redirect to homepage if not logged in
  if (!user?.username) {
    return <Redirect to="/" />;
  }

  return (
    <div>

      <div className="profilelist">
        <h2 className="viewpro" align="center">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="">{!userParam && <PostForm />}</div>

      <div className="postprofile">
        <div >
          <PostList deleteP={allowDelete(user.username)} posts={user.posts} title={`${user.username}'s thoughts...`} />
        </div>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <InspirationList inspirations={user.inspirations} />
        </div>
      </div>

    </div>
  );
};

export default Profile;
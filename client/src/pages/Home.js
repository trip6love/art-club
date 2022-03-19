// will default to user login/signup
import { Link } from 'react-router-dom';

import React from 'react';

const Home = () => {
  return (
    
    <div className='homepage'>
      <h1 className='logo'>Logo will go here</h1>
      <Link
        to={`/login`}
        
        className="login"
        >
        Login Here
        </Link>

        <Link
        to={`/signup`}
        
        className="signup"
        >
        SignUp Here
        </Link>
    </div>
  );
};

export default Home;
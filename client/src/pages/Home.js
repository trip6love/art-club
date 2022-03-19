// will default to user login/signup
import { Link } from 'react-router-dom';

import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Logo will go here</h1>
      <Link
        to={`/login`}
        style={{ fontWeight: 700}}
        className=""
        >
        Login Here
        </Link>

        <Link
        to={`/signup`}
        style={{ fontWeight: 700}}
        className=""
        >
        SignUp Here
        </Link>
    </div>
  );
};

export default Home;

//hello
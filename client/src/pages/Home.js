// will default to user login/signup
import { Link } from 'react-router-dom';

import React from 'react';


const Home = () => {
  return ( 
    <div className='homepage'>
      <div className='paint'>
      <h1 className='brush fa fa-paint-brush'></h1>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet"></link>
      <Link to={`/login`} className="login">
        <button renderAs="button" className='homebutton'>
          Login 
        </button>
      </Link>

      <Link to={`/signup`} className="signup">
        <button renderAs="button" className='homebutton'>
        Sign Up
        </button>
      </Link>
    </div>
  );
};

export default Home;
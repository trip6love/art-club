import React, { useState } from 'react';
//intergrating Apollo to front-end
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Account from './pages/Account';
import Artboard from './pages/ArtBoard';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Post from './pages/Post';
import SignUp from './pages/SignUp';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });
  
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {
  const [currentPage, setCurrentPage] = useState('Login');

  const renderPage = () => {
        if (currentPage === 'Login') {
          return <Login />
        }
        if (currentPage === 'Artboard') {
            return <Artboard />
        }
        if (currentPage === 'SignUp') {
            return <SignUp />
        }
        if (currentPage === 'Post') {
            return <Post />
        }
        if (currentPage === 'Logout') {
            return <Logout />
        }
        if (currentPage === 'Account') {
            return <Account />
        }
    };

    const handlePageChange = (page) => setCurrentPage (page);

    return (
        <ApolloProvider client={client}>
        <div>
            <Header />
            <Artboard />
            <Footer />
            
        </div>
        </ApolloProvider>
    )
}

export default App;

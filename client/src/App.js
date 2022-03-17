import React, { useState } from 'react';
//intergrating Apollo to front-end
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//React Router Import
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Profile from './pages/Profile';
import Artboard from './pages/ArtBoard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
//middleware function that will retrieve the token and 
//combine it to exhisting httpLink
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers, 
        authorization: token ? `Bearer ${token}` : '', 
      }
    }
});

//combines the authLink and httpLink objects so that
//every request retrieves the token and sets the request headers 
//before making the request to the API
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {

    return (
        <ApolloProvider client={client}>
            <Router>
                <Header />
                    <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/artboard' component={Artboard} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path="/profile/:username?" component={Profile} />
                        <Route exact path='/post/:id' component={SinglePost} />

                        <Route component={NoMatch} />
                    </Switch>
                    </div>
                <Footer />
            </Router>
        </ApolloProvider>
    )
}

export default App;

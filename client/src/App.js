import React, { useState } from 'react';
//intergrating Apollo to front-end
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//React Router Import
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Profile from './pages/Profile';
import Artboard from './pages/ArtBoard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
//import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {

    return (
        <ApolloProvider client={client}>
            <Router>
                <Header />
                    <div>
                    <Switch>
                        <Route exact path='/' component={Artboard} />
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

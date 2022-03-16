import React, { useState } from 'react';
//intergrating Apollo to front-end
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//React Router Import
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Account from './pages/Account';
import Artboard from './pages/ArtBoard';
import Login from './pages/Login';
import Logout from './pages/Logout';
import SignUp from './pages/SignUp';

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
                    <Switch>
                        <div>
                        <Route exact path='/' component={Artboard} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/logout' component={Logout} />
                        <Route exact path='/account' component={Account} />
                        </div>
                    </Switch>
                <Footer />
            </Router>
        </ApolloProvider>
    )
}

export default App;

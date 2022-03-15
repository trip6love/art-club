import React, { useState } from 'react';


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
        <div>
            <Header />
            <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
            <Footer />
            
        </div>
    )
}

export default App;

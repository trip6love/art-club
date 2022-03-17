import { Link } from 'react-router-dom';
import Auth from '../../src/utils/auth';

//navgiation component that sets each page to have a unique URL
//This is a front-end routing using React Router Library

//calls the auth logout function that clears the cache/token
const logout = event => {
    event.preventDefault();
    Auth.logout();
};

function Navbar ({ currentPage, handlePageChange}) {
    return(
        <nav>
            {Auth.loggedIn() ? (
                <>
                <Link to="/artboard">Art Board</Link>
                <Link to="/profile">My Profile</Link>
                <a href="/" onClick={logout}>Log Out</a>
                </>
            ) : (
                <>
                </>
            )}
        </nav>
    )
}

export default Navbar;
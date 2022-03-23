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
        <nav align="center">
            {Auth.loggedIn() ? (
                <>
                <Link to="/artboard" className='navbaritems'>
                    <button renderAs="button" className='artboardbtn'>
                        Art Board
                    </button>
                </Link>
                <Link to="/harvardart" className='navbaritems'>   
                    <button renderAs="button" className='profilebtn'>
                        Inspiration
                    </button>
                </Link>
                <Link to="/profile" className='navbaritems'>   
                    <button renderAs="button" className='profilebtn'>
                        My Profile
                    </button>
                </Link>
                
                <a href="/" onClick={logout} className='navbaritems'>
                    <button renderAs="button" className='logoutbtn'>
                        Log Out
                    </button>
                </a>
                </>
            ) : (
                <>
                </>
            )}
        </nav>
    )
}

export default Navbar;
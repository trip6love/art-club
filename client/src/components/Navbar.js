import { Link } from 'react-router-dom';

//navgiation component that sets each page to have a unique URL
//This is a front-end routing using React Router Library
function Navbar ({ currentPage, handlePageChange}) {
    return(
        <nav>
            <Link to="/">Art Club</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/">Art Board</Link>
            <Link to="/">Log Out</Link>
        </nav>
    )
}

export default Navbar;
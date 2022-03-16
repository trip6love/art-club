import { Link } from 'react-router-dom';

//navgiation component that sets each page to have a unique URL
//This is a front-end routing using React Router Library
function Navbar ({ currentPage, handlePageChange}) {
    return(
        <nav>
            <Link to="/">Art Club</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/account">My Account</Link>
        </nav>
    )
}

export default Navbar;
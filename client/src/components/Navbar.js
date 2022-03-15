function Navbar ({ currentPage, handlePageChange}) {
    return(
        <ul className="nav">
            <li>
                <a href="#account"
                    onClick={() => handlePageChange('Account')}
                    className={currentPage === 'Account' ? 'nav-item-active' : 'nav-item'}
                >
                    Profile
                </a>
            </li>
            <li>
                <a href="#post"
                    onClick={() => handlePageChange('Post')}
                    className={currentPage === 'Post' ? 'nav-item-active' : 'nav-item'}
                >
                    Post
                </a>
            </li>
            <li>
                <a href="#artboard"
                    onClick={() => handlePageChange('Artboard')}
                    className={currentPage === 'Artboard' ? 'nav-item-active' : 'nav-item'}
                >
                    Artboard
                </a>
            </li>
            <li>
                <a href="#logout"
                    onClick={() => handlePageChange('Logout')}
                    className={currentPage === 'Logout' ? 'nav-item-active' : 'nav-item'}
                >
                    Logout
                </a>
            </li>
        </ul>

    )
}

export default Navbar;
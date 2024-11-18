import { NavLink } from 'react-router-dom';

const NavBar = ({ user, handleSignOut }) => {
  return (
    <>
      { user ? (
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default NavBar;
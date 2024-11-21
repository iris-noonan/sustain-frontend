import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './NavBar.module.scss';

const NavBar = ({ user, handleSignOut }) => {
  return (
    <div className={styles.header}>
      <NavLink to="/">
        <img src={logo} width="290" />
      </NavLink>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          { user ? (
            <>
              <li><NavLink to="/">Products</NavLink></li>
              <li><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>
            </>
          ) : (
            <li><NavLink to="/">Products</NavLink></li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;
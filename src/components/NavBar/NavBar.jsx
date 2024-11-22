import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './NavBar.module.scss';

const NavBar = ({ user, handleSignOut }) => {
  return (
    <div className={styles.header}>
      <NavLink to="/">
        <img className={styles.logo} src={logo} width="290" />
      </NavLink>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          { user &&
            <>
              <li className={styles.navListItem}><NavLink to="/">Products</NavLink></li>
              { user.admin &&
                <li className={styles.navListItem}><NavLink to="/products/new">New Product</NavLink></li>
              }
              <li className={styles.logout}><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>
            </>
          }
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;
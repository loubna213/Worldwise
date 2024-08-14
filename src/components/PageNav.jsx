import { Link, NavLink } from "react-router-dom";
import styles from './PageNav.module.css'
import Logo from './Logo'

const PageNav = () => {
    return (
      <header>
        <nav className={styles.nav}>
          <Logo/>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/Product'>Product</NavLink></li>
            <li><NavLink to='/Pricing'>Pricing</NavLink></li>
            <li><NavLink to='/Login'>Login</NavLink></li>
          </ul>
          <Link to='/Login' className={styles.ctaLink}>log in</Link>
        </nav>
      </header>
    )
}

export default PageNav;
  
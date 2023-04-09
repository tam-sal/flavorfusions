import { NavLink } from "react-router-dom"
import styles from './NavBar.module.css'
const NavBar = () => {

  return (
    <nav>
      <div className={styles.navContainer}>
        <NavLink exact to='/flavorfusion' activeClassName={styles.activeLink} className={`${styles.navItem} ${styles.navLink}`}>Home</NavLink>
        <NavLink exact to='/create-recipe' activeClassName={styles.activeLink} className={`${styles.navItem} ${styles.navLink}`}>Create</NavLink>
      </div>
    </nav>
  )
}
export default NavBar
import { NavLink } from "react-router-dom"
import styles from './NavBar.module.css'
import { getRecipes } from '../../Redux/actions/creators'
import { useDispatch } from 'react-redux'

const NavBar = () => {

  const dispatch = useDispatch()

  const homeRedirect = () => {

    dispatch(getRecipes())
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'

    })

  }

  return (
    <nav>
      <div className={styles.navContainer}>
        <NavLink exact to='/flavorfusion' activeClassName={styles.activeLink} className={`${styles.navItem} ${styles.navLink}`} onClick={homeRedirect}>Home</NavLink>
        <NavLink exact to='/create-recipe' activeClassName={styles.activeLink} className={`${styles.navItem} ${styles.navLink}`}>Create</NavLink>
      </div>
    </nav>
  )
}
export default NavBar
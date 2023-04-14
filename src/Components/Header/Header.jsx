import logo from '../../assets/logo/logo.PNG'
import styles from './Header.module.css'
import { NavBar, Search } from '../'
import { getRecipes } from '../../Redux/actions/creators'
import { useDispatch } from 'react-redux'


const Header = () => {

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
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerItems}>
          <img src={logo} alt="logo" className={styles.logo} onClick={homeRedirect} />
          <span className={styles.brand} onClick={homeRedirect}>FLAVORFUSION</span>
        </div>
        <NavBar />
        <Search />
      </div>
    </>
  )
}
export default Header
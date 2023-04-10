import logo from '../../assets/logo/logo.PNG'
import styles from './Header.module.css'
import { useHistory } from 'react-router-dom'
import { NavBar, Search } from '../'


const Header = () => {

  const history = useHistory()

  const homeRedirect = () => {
    history.push('/flavorfusion')
    // window.location.reload()
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
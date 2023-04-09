import { Link } from "react-router-dom"
import styles from './Landing.module.css'
const Landing = () => {
  return (
    <div className={styles.landing}>
      <p className={styles.mainTitle}>FLAVORFUSION</p>
      <Link to='/flavorfusion'>
        <button className={styles.landingBtn}>ENJOY</button>
      </Link>
    </div>
  )
}
export default Landing
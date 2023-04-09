import styles from './Error.module.css'
import errBG from '../../assets/bg/error.gif'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
const Error = () => {

  const history = useHistory()

  const backHomeHandler = () => {
    setTimeout(() => {
      history.push('/flavorfusion')
    }, 7000);
  }

  useEffect(() => {
    backHomeHandler()
  })


  return (
    <>
      <div className={styles.errContainer}>
        <img src={errBG} alt="error" className={styles.bgErr} />
        <div className={styles.errMsg}>
          <h1>Page Not Found</h1>
          <h2>You will be redirected back to home within 7 seconds</h2>
        </div>

      </div>
    </>
  )
}
export default Error
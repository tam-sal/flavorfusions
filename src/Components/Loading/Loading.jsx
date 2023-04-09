import styles from './Loading.module.css'

const Loading = () => {
  return (
    <>
      <div className={styles.loading}>
        <div className={styles.ripples}>
          <div className={styles.ripples__dot}></div>
        </div>
      </div>
    </>
  )
}
export default Loading
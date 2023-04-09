import { NavLink } from 'react-router-dom'
import styles from './Pagination.module.css'

const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className={styles.paginate}>
        <ul className={styles.pageList}>
          {pageNumbers.map(num =>
            <li key={num} className={styles.listItem}>
              <NavLink to='#' onClick={() => paginate(num)} className={styles.numLink} >
                {num}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}
export default Pagination
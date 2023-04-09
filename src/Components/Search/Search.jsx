import { getByName } from '../../Redux/actions/creators.js'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import searchIcon from '../../assets/icons/search.png'
import styles from './Search.module.css'

const Search = () => {
  const dispatch = useDispatch()
  const [searched, setSearched] = useState('')


  const titleInputHandler = (e) => {
    let { value: title } = e.target
    title = title.toLowerCase()
    setSearched(title)
  }
  const handleSearchClick = (e) => {
    dispatch(getByName(searched))
    setSearched('')
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <input type="search" title='min 5 characters' autoComplete='off' placeholder='search a recipe' value={searched} onChange={(e) => titleInputHandler(e)} />
      </div>
      <div className={styles.searchClick}>
        <button className={styles.searchBtn}
          onClick={(e) => handleSearchClick(e)}
          disabled={searched.length < 3 || !searched}
        >
          <img src={searchIcon} alt="search" className={styles.searchIcon} />
        </button>
      </div>

    </div>
  )
}
export default Search
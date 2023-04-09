import { Card, Pagination, Loading } from '../'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Cards.module.css'
import { getRecipes, getDiets, sortAZ, sortZA, filterByDiet, filterDataSource, filterHealth, setDefault } from '../../Redux/actions/creators.js'
import { Link } from 'react-router-dom'
import filtericon from '../../assets/icons/filter2.png'
import reloadIcon from '../../assets/icons/reload.png'


const Cards = () => {
  const dispatch = useDispatch()
  const { recipes } = useSelector(state => state)
  const { diets } = useSelector(state => state)
  const { isLoading } = useSelector(state => state)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 9
  const lastCardIdx = currentPage * cardsPerPage
  const firstCardIdx = lastCardIdx - cardsPerPage
  const currentCards = recipes.slice(firstCardIdx, lastCardIdx)


  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  //* filters
  const handleChangeDiet = (e) => {
    const { value: diet } = e.target
    if (diet === 'default') dispatch(setDefault())
    dispatch(filterByDiet(diet))
    setCurrentPage(1)
  }

  const handleAlphaSort = (e) => {
    const { value: alpha } = e.target
    if (alpha === 'AZ') dispatch(sortAZ())
    if (alpha === 'ZA') dispatch(sortZA())
    if (alpha === 'default') dispatch(setDefault())
    setCurrentPage(1)
  }

  const handleDataSource = (e) => {
    const { value: dataSource } = e.target
    dispatch(filterDataSource(dataSource))
    setCurrentPage(1)
  }

  const handleHealthScore = (e) => {
    const { value: hs } = e.target
    dispatch(filterHealth(hs))
    setCurrentPage(1)
  }

  const reloadHandler = () => {
    window.location.reload()
    setCurrentPage(1)
  }


  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && <div className={styles.cardsContainer}>
        <div className={styles.filtersContainer}>
          <img src={filtericon} alt="filicon" className={styles.filterIcon} />
          <img src={reloadIcon} alt="reload" className={styles.reloadIcon} />
          <select name="diets" onChange={(e) => handleChangeDiet(e)}>
            <option value="default">All Diets</option>
            {diets.map(d => {
              return (
                <option key={d.id} value={d.name}>{d.name}</option>
              )
            })}
          </select>

          <select name="alphasort" onChange={(e) => handleAlphaSort(e)}>
            <option value="default">Alpha Sort</option>
            <option value="AZ">-- A-Z --</option>
            <option value="ZA">-- Z-A --</option>
          </select>

          <select name="hssort" onChange={(e) => handleHealthScore(e)}>
            <option value="default">Health Score</option>
            <option value="des">-- + --</option>
            <option value="asc">-- - --</option>
          </select>

          <select name="datasource" onChange={(e) => handleDataSource(e)}>
            <option value="default">API | DB</option>
            <option value="db">-- DB --</option>
            <option value="api">-- API --</option>
          </select>

          <button onClick={reloadHandler}>Reload All</button>
        </div>
        <div className={styles.cardsInFlex}>
          {currentCards.length !== 0 && currentCards.map(card => (

            <div key={card.id} className={styles.SingleCard}>
              <Link exact to={`details/${card.id}`}>
                <Card
                  key={card.id}
                  title={card.title}
                  image={card.image}
                  Diets={card.Diets}
                /></Link>
            </div>
          )
          )}</div>


        <div className={styles.paginateInCards}>
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={recipes.length}
            paginate={paginate}
          />
        </div>
      </div>
      }
    </>
  )

}
export default Cards
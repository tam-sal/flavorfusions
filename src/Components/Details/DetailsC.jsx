import { useEffect } from "react"
import { getRecipeDetails, clearDetails } from '../../Redux/actions/creators.js'
import { Loading } from '../index.js'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import styles from './Details.module.css'

const DetailsC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { details, isLoading } = useSelector(state => state)

  useEffect(() => {
    dispatch(getRecipeDetails(id))
    dispatch(clearDetails())

  }, [id, dispatch])



  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <div className={styles.recipeDetails}>
        <h1>{details.title}</h1>

        <img src={details.image} alt='recipe details' className={styles.recImage} />
        <br />
        <div className={styles.summary}>
          <div className={styles.danHTML} dangerouslySetInnerHTML={{ __html: details.summary }} />
        </div>
        <br />
        <div className={styles.healthScore}>
          <h5>Health Score</h5>
          <div className={`${styles.danHTML} ${styles.health}`} dangerouslySetInnerHTML={{ __html: details.healthScore }} />
        </div>

        <br />
        <h5>Recipe Recommended For The Following Diets</h5>

        {details.Diets?.map(d => {
          return (
            <span key={d.id} className={styles.dietName}>{d.name} <br /> </span>
          )
        })}
        <br />
        <h5 className={styles.prepTitle}>Prepare This Recipe Following These Steps</h5><br></br>
        <div className={`${styles.danHTML} ${styles.steps}`} dangerouslySetInnerHTML={{ __html: details.steps }} />
        <span>ID: <span className={styles.recId}>{details.id}</span></span>
      </div>}

    </>
  )
}
export default DetailsC
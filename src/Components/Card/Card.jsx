import styles from './Card.module.css'

const Card = ({ id, title, image, summary, healthScore, steps, Diets, createdInDb }) => {
  const diets = Diets.map(d => {
    return (<span key={d.name}>  {d.name}<br /></span>)
  })


  return (
    <div className={styles.minimalCardContainer}>
      <img src={image} alt={id} className={styles.cardImg} />

      <h3>{title}</h3>
      <h4>Diet Type</h4>
      {diets}
    </div >
  )
}
export default Card
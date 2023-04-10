import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiets } from '../../Redux/actions/creators'
import axios from 'axios'
import sendIcon from '../../assets/icons/send.png'
import { Loading } from '../'
import styles from './Form.module.css'





const FormC = () => {

  const dispatch = useDispatch()
  const { diets } = useSelector(state => state)
  let [selected, setSelected] = useState([])
  const apiURL = process.env.REACT_APP_APIURL
  console.log(diets)


  const initialFormState = {
    title: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: [],
    createdInDb: true
  }
  const initialErrorsState = {
    title: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    isValid: false
  }

  const [formState, setFormState] = useState(initialFormState)
  const [errors, setErrors] = useState(initialErrorsState)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const handleSelected = (e) => {
    const { value: addedDiet } = e.target
    setFormState({ ...formState, diets: [...new Set([...selected, addedDiet])] })
    setSelected([...new Set([...selected, addedDiet])])
  }

  const handleRemoveSelected = (e) => {
    const { innerText: dietToRemove } = e.target
    setSelected(selected.filter(diet => diet !== dietToRemove))
    setFormState({ ...formState, diets: selected.filter(diet => diet !== dietToRemove) })
  }


  //! validation start
  //* title should be in range 15 to 80 - only letters
  const validateTitle = (formState) => {
    const titleRegEx = /^[a-zA-Z\s]{15,80}$/;
    if (titleRegEx.test(formState.title)) setErrors({ ...errors, title: '', isValid: true })
    if (!titleRegEx.test(formState.title)) setErrors({ ...errors, title: '>> Only Alpha Characters | Range [15:80]' })
    if (!formState.title) setErrors({ ...errors, title: '>> title field is required', isValid: false })
  }

  //* images should be provided from trusted sources and correct extension
  const validateImage = (formState) => {
    const imgRegEx = /^(https?:\/\/(?:www\.)?(?:foodiesfeed\.com|unsplash\.com|pexels\.com)\/[^?#]+\.(?:jpe?g|png))$/i

    if (imgRegEx.test(formState.image)) setErrors({ ...errors, image: '', isValid: true })
    if (!imgRegEx.test(formState.image)) setErrors({ ...errors, image: '>> trusted sources: foodiesfeed.com - unsplash.com  - pexels.com' })
    if (!formState.image) setErrors({ ...errors, image: '>> image field is required', isValid: false })
  }

  //* Summary should be minimum 150 characters - max 600
  const validateSummary = (formState) => {
    const sumRegEX = /^(?=.{150,600}$)[\w\W]*\S[\w\W]*$/

    if (sumRegEX.test(formState.summary)) setErrors({ ...errors, summary: '', isValid: true })
    else if (!sumRegEX.test(formState.summary)) setErrors({ ...errors, summary: '>> min characters 150 - max 600' })
    if (!formState.summary) setErrors({ ...errors, summary: '>> summary field is required' })
  }

  //* HealthScore between 20 upto 120
  const validateHS = (formState) => {
    const hsRegEX = /^(?:2[0-9]|[3-9][0-9]|1[01][0-9]|120)$/
    if (hsRegEX.test(formState.healthScore)) setErrors({ ...errors, healthScore: '', isValid: true })
    else if (!hsRegEX.test(formState.healthScore)) setErrors({ ...errors, healthScore: 'range between 20 - 120', isValid: false })
    if (!formState.healthScore) setErrors({ ...errors, healthScore: '>> health score field is required' })
  }

  //* Steps
  const validateSteps = (formState) => {
    const stepsRegEx = /^(?=.{150,600}$)[\w\W]*\S[\w\W]*$/
    if (stepsRegEx.test(formState.steps)) setErrors({ ...errors, steps: '', isValid: true })
    else if (!stepsRegEx.test(formState.steps)) setErrors({ ...errors, steps: 'range between 150 - 600' })
    if (!formState.steps) setErrors({ ...errors, steps: '>> steps field is required' })
  }

  //! validate end

  const handleFormChange = (e) => {
    let { name, value } = e.target

    name === 'title' && validateTitle({
      ...formState,
      [name]: value
    })
    name === 'image' && validateImage({
      ...formState,
      [name]: value
    })

    name === 'summary' && validateSummary({
      ...formState,
      [name]: value
    })
    name === 'steps' && validateSteps({
      ...formState,
      [name]: value
    })
    name === 'healthScore' && validateHS({
      ...formState,
      [name]: value.trim()
    })

    setFormState({
      ...formState,
      [name]: value
    })
  }


  const validForm = (formState.diets.length > 0) && errors.isValid && Object.values(formState).every(Boolean)

  const submitHandler = async (e) => {
    e.preventDefault()
    { loading && <Loading /> }
    try {
      const { data: response } = await axios.post(`${apiURL}/recipes`, formState)
      setLoading(false)
      setFormState(initialFormState)
      setSelected([])
      return alert(response.msg)
    }
    catch (error) {
      if (error.response) return alert(error.response.data.error)
      if (error.request) return alert(error.request)
      return alert(error.message)
    }
  }


  return (
    <>

      <div className={styles.formPageContainer}>
        <h2 className={styles.formTitle}>Create Your Recipe</h2>
        <div className={styles.formContainer}>
          <form onSubmit={submitHandler}>
            {/* title */}
            <br />
            <label htmlFor="title">TITLE</label> <br />
            <input name='title' autoComplete='off' autoCapitalize='words' type="text" placeholder='recipe title...' value={formState.title} onChange={handleFormChange} />
            <br />
            {errors.title && <span className={styles.inputErr}>{errors.title}<br /></span>}
            {/* Image */}
            <label htmlFor="image">RECIPE IMAGE</label><br />
            <input name='image' autoComplete='off' type="text" value={formState.image} onChange={handleFormChange} placeholder='image from a trusted source...' title='trusted sources: | www.foodiesfeed.com | https://unsplash.com | https://www.pexels.com | right click and copy image address' />
            <br />
            {errors.image && <span className={styles.inputErr}>{errors.image}<br /></span>}
            {/* Sumary */}
            <label htmlFor="summary">SUMMARY</label><br />
            <textarea name="summary" cols="30" rows="10" autoCapitalize='sentence' autoComplete='off' placeholder='Summary of the recipe..' value={formState.summary} onChange={handleFormChange}></textarea>
            <br />
            {errors.summary && <span className={styles.inputErr}>{errors.summary}<br /></span>}
            {/* Steps */}
            <label htmlFor="steps">STEPS</label><br />
            <textarea name="steps" cols="30" rows="10" autoCapitalize='sentence' autoComplete='off' placeholder='Steps to prepare the recipe..' value={formState.steps} onChange={handleFormChange}></textarea>
            <br />
            {errors.steps && <span className={styles.inputErr}>{errors.steps}<br /></span>}
            {/* Health Score */}
            <label htmlFor="healthScore">Health Score</label><br />
            <input type="text" name='healthScore' autoComplete='off' placeholder='Enter health score..' value={formState.healthScore} onChange={handleFormChange} />
            <br />
            {errors.healthScore && <span className={styles.inputErr}>{errors.healthScore}<br /></span>}
            {/* diets */}
            <label htmlFor="diets" title='Choose Upto 4 Diets'>Matching Diets</label><br />
            <select name="diets" title='Choose Upto 4 Diets' value={formState.diets} onChange={handleSelected} disabled={formState.diets.length >= 4 ? true : false}>
              <option value={null}>-- choose diets --</option>
              {diets.map(d => {
                return (
                  <option key={d.id} value={d.name}>{d.name}</option>
                )
              })}
            </select>
            {selected.length > 0 && <h5>Remove Selected</h5>}

            {selected.length > 0 && <div className={styles.selectedDiets}>
              {selected?.map(d => {
                return (
                  <div className={styles.singleDiet} key={d} onClick={handleRemoveSelected} title='click to remove diet'>{d}</div>
                )
              })}
            </div>
            }

            <br /><br />

            <button className={styles.submitBtn} type='submit' disabled={!validForm}>
              <span className={styles.sendText}>SEND</span>&emsp;
              <img src={sendIcon} alt="send" className={styles.sendIcon} />
            </button>
            <br /><br />
          </form>
        </div>
      </div>
    </>
  )
}
export default FormC
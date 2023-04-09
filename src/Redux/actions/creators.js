import axios from 'axios'
import { GET_RECIPES, GET_RECIPE_BY_ID, GET_DIETS, GET_RECIPE_BY_NAME, SORT_AZ, SORT_ZA, FILTER_DIETS, FILTER_DATA_SOURCE, FILTER_HS, LOADING, CLEAR_DETAILS, DEFAULT } from './types'



const apiURL = process.env.REACT_APP_APIURL
const loading = () => {
  return {
    type: LOADING
  }
}

const getRecipes = () => {
  return async (dispatch) => {
    dispatch(loading())
    try {
      const { data: recipes } = await axios.get(`${apiURL}/recipes`)
      dispatch({
        type: GET_RECIPES,
        payload: recipes
      })
    }
    catch (error) {
      return error.message
    }
  }

}


const getDiets = () => {
  return async (dispatch) => {
    try {
      const { data: diets } = await axios.get(`${apiURL}/diets`)
      dispatch({
        type: GET_DIETS,
        payload: diets
      })
    }
    catch (error) {
      return error.message
    }
  }
}



const getRecipeDetails = (id) => {
  return async (dispatch) => {
    dispatch(loading())
    try {
      const { data: recipeById } = await axios.get(`${apiURL}/recipes/${id}`)
      dispatch({
        type: GET_RECIPE_BY_ID,
        payload: recipeById
      })
    }
    catch (error) {
      return error.message
    }
  }
}


const clearDetails = () => {
  return {
    type: CLEAR_DETAILS
  }
}

const setDefault = (payload) => {
  return {
    type: DEFAULT,
    payload
  }
}



const getByName = (title) => {
  return async (dispatch) => {

    if (title) {
      try {
        const { data: recipeByTitle } = await axios.get(`${apiURL}/recipes?title=${title}`)
        dispatch({
          type: GET_RECIPE_BY_NAME,
          payload: recipeByTitle
        })
      }
      catch (error) { return error.message }
    }
    else return []
  }
}



const sortAZ = (payload) => {
  return {
    type: SORT_AZ,
    payload
  }
}

const sortZA = (payload) => {
  return {
    type: SORT_ZA,
    payload
  }
}

const filterByDiet = (payload) => {

  return {
    type: FILTER_DIETS,
    payload
  }
}

const filterDataSource = (payload) => {
  return {
    type: FILTER_DATA_SOURCE,
    payload
  }
}

const filterHealth = (payload) => {
  return {
    type: FILTER_HS,
    payload
  }
}

export { getRecipes, getDiets, getRecipeDetails, clearDetails, getByName, sortAZ, sortZA, filterByDiet, filterDataSource, filterHealth, setDefault }
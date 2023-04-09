import { GET_RECIPES, GET_RECIPE_BY_ID, GET_DIETS, GET_RECIPE_BY_NAME, SORT_AZ, SORT_ZA, FILTER_DIETS, FILTER_DATA_SOURCE, FILTER_HS, LOADING, CLEAR_DETAILS, DEFAULT } from '../actions/types'

const initialState = {
  recipes: [],
  backupRecipes: [],
  details: {},
  diets: [],
  isLoading: false
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }

    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        backupRecipes: payload,
        isLoading: false
      }

    case GET_RECIPE_BY_ID:
      return {
        ...state,
        details: payload,
        isLoading: false
      }

    case CLEAR_DETAILS:
      return {
        ...state,
        details: {}
      }

    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: payload
      }

    case GET_DIETS:
      return {
        ...state,
        diets: payload
      }

    case FILTER_DIETS:
      let filteredByDiet = []
      if (payload === 'default') {
        filteredByDiet = state.backupRecipes
      } else {
        for (let i = 0; i < state.backupRecipes.length; i++) {
          let recipe = state.backupRecipes[i]
          let diets = recipe.Diets.map(diet => diet.name)
          if (diets.includes(payload)) {
            filteredByDiet.push(recipe)
          }
        }
      }
      return {
        ...state,
        recipes: filteredByDiet
      }


    case SORT_AZ:
      return {
        ...state,
        recipes: state.recipes.toSorted((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()))
      }

    case SORT_ZA:
      return {
        ...state,
        recipes: state.recipes.toSorted((a, b) => b.title.toUpperCase().localeCompare(a.title.toUpperCase()))
      }

    case FILTER_DATA_SOURCE:
      let filteredDS
      if (payload === 'default') filteredDS = state.backupRecipes
      else {

        if (payload === 'db') filteredDS = state.backupRecipes.filter(res => res.createdInDb)
        if (payload === 'api') filteredDS = state.backupRecipes.filter(res => !res.createdInDb)
      }

      return {
        ...state,
        recipes: filteredDS
      }

    case FILTER_HS:
      let filteredHS
      if (payload === 'default') filteredHS = state.backupRecipes
      else {
        if (payload === 'des') filteredHS = state.backupRecipes.toSorted((a, b) => a.healthScore < b.healthScore ? 1 : a.healthScore > b.healthScore ? -1 : 0)
        if (payload === 'asc') filteredHS = state.backupRecipes.toSorted((a, b) => a.healthScore > b.healthScore ? 1 : a.healthScore < b.healthScore ? -1 : 0)
      }
      return {
        ...state,
        recipes: filteredHS
      }

    case DEFAULT:
      return {
        ...state,
        recipes: state.backupRecipes
      }

    default:
      return {
        ...state
      }

  }
}

export default rootReducer
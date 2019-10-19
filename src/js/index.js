import Search from './models/Search'
import Recipe  from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

/* Global State
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {}

/* 
 * SEARCH CONTROLLER
 */

const controlSearch = async () =>
{
    const query = searchView.getInput()

    if(query)
    {
        state.search = new Search(query)

        searchView.clearResults()
        searchView.clearInput()
        renderLoader(elements.searchResults)

        try
        {
            await state.search.getResults()

            clearLoader()
            searchView.renderResults(state.search.result)
        }
        catch (error)
        {
            alert('Error: Something went wrong!')
            clearLoader()
        }
    }
}

elements.searchForm.addEventListener('submit', e => 
{
    e.preventDefault()
    controlSearch()
})

elements.searchResultPages.addEventListener('click', e => 
{
    const btn = e.target.closest('.btn-inline')

    if (btn)
    {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }
})

/*
 * RECIPE CONTROLLER
 */

const controlRecipe = async () =>
{
    const id = window.location.hash.replace('#', '')
    console.log(id)

    if(id)
    {
        recipeView.clearRecipe()
        renderLoader(elements.recipe)

        if(state.search) searchView.highlightSelected(id)

        state.recipe = new Recipe(id)

        try 
        {
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()

            state.recipe.calcTime()
            state.recipe.calcServings()

            clearLoader()
            recipeView.renderRecipe(state.recipe)
        }
        catch (error)
        {
            alert('Error: Couldn\'t process recipe!' + error)
        }
    }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe))
import Search from './models/Search'
import Recipe  from './models/Recipe'
import * as searchView from './views/searchView'
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
    const query = searchView.getInput();

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
        state.recipe = new Recipe(id)

        try 
        {
            await state.recipe.getRecipe()

            state.recipe.calcTime()
            state.recipe.calcServings()

            console.log(state.recipe)
        }
        catch (error)
        {
            alert('Error: Couldn\'t process recipe!')
        }
    }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe))
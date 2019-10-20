import Search from './models/Search'
import Recipe  from './models/Recipe'
import List  from './models/List'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import { elements, renderLoader, clearLoader } from './views/base'

/* Global State
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {}
window.state = state

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

/*
 * LIST CONTROLLER
 */

const controlList = () => 
{
    if(!state.list) state.list = new List()

    state.recipe.ingredients.forEach(el => 
        {
            const item = state.list.addItem(el.count, el.unit, el.ingredient)
            listView.renderItem(item)
        })
}

elements.shopping.addEventListener('click', e => 
{
    const id = e.target.closest('.shopping__item').dataset.itemid

    if(e.target.matches('.shopping__delete, .shopping__delete *'))
    {
        state.list.deleteItem(id)

        listView.deleteItem(id)
    }
    else if(e.target.matches('.shopping__count-value'))
    {
        const val = parseFloat(e.target.value, 10)
        state.list.updateCount(id, val)
    }
})

elements.recipe.addEventListener('click', e => 
{
    if (e.target.matches('.btn-decrease, .btn-decrease *'))
    {
        if(state.recipe.servings > 1) state.recipe.updateServings('dec')
    }
    
    else if(e.target.matches('.btn-increase, .btn-increase *'))
    {
        state.recipe.updateServings('inc')
    }

    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) 
    {
        controlList()
    }

    recipeView.updateServingsIngredients(state.recipe)
    
})
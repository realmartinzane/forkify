import Search from './models/Search'
import * as searchView from './views/search'
import { elements, renderLoader, clearLoader } from './views/base'

/* Global State
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {}

const controlSearch = async () =>
{
    const query = searchView.getInput();

    if(query)
    {
        state.search = new Search(query)

        searchView.clearResults()
        searchView.clearInput()
        renderLoader(elements.searchResults)

        await state.search.getResults()

        clearLoader();
        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => 
{
    e.preventDefault();
    controlSearch();
});

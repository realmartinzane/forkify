import Search from './models/Search'
import * as searchView from './views/search'
import { elements } from './views/base'

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
    console.log(query)

    if(query)
    {
        state.search = new Search(query)

        searchView.clearResults();
        searchView.clearInput();

        await state.search.getResults()

        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => 
{
    e.preventDefault();
    controlSearch();
});

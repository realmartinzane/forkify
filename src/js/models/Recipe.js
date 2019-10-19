import axios from 'axios'
import { key } from '../config'

export default class Recipe
{
    constructor(id)
    {
        this.id = id
    }

    async getRecipe()
    {
        try 
        {
            const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            this.title = result.data.recipe.title
            this.publisher = result.data.recipe.publisher
            this.image = result.data.recipe.image_url
            this.url = result.data.recipe.source_url
            this.ingredients = result.data.recipe.ingredients
        }
        catch(error)
        {
            alert('Error: Something went wrong!')
        }
    }

    calcTime()
    {
        const numIngridients = this.ingredients.length
        const periods = Math.ceil(numIngridients / 3)
        this.time = periods * 10
    }
    
    calcServings()
    {
        this.servings = 4
    }
}
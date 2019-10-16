import axios from 'axios'

export default class Search
{
    constructor(query)
    {
        this.query = query
    }

    async getResults()
    {
        const key = '2c18e19bc34d81949e3ff6aa7e3f39e3'
        try 
        {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = res.data.recipes
        }
        catch (error)
        {
            alert(error)
        }
    }
}

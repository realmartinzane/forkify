// 2c18e19bc34d81949e3ff6aa7e3f39e3
// https://www.food2fork.com/api/search

import axios from 'axios'

async function getResults(query)
{
    const key = '2c18e19bc34d81949e3ff6aa7e3f39e3'
    try 
    {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`)
        console.log(res.data.recipes)
    }
    catch (error)
    {
        alert(error)
    }
}
getResults('pizza')
import './SearchBar.css'
import searchIcon from './search.png'
import { useState } from 'react'

function SearchBar({stockAlias}){
    const [searchQuery,setSearchQuery] = useState('')
    function submitSearchQuery(event){
        event.preventDefault();
        console.log(`Searching for ${searchQuery}..`);
        stockAlias(searchQuery);
    }

    return(
        <form className="search-bar" action='' onSubmit={(e)=>submitSearchQuery(e)}>
            <input type="text" placeholder='Search' className="search-bar-input" onChange={(a)=>setSearchQuery(a.target.value)}/>
            <input type='submit' className="search-bar-button"/>
        </form>
    )
}

export default SearchBar
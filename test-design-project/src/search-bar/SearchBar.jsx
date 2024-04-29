import './SearchBar.css'
import searchIcon from './search.png'


function SearchBar(){
    return(
        <div className="search-bar">
            <input type="text" placeholder='Search' className="search-bar-input"/>
            <button className="search-bar-button"></button>
        </div>
    )
}

export default SearchBar
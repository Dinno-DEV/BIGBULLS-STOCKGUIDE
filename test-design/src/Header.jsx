import './SearchBar.css'
import './Header.css'

function SearchBar(){
    return(
        <div className="main-color search-bar-div">
            <input idname="SearchBar" type="text" placeholder="Search" className='search-bar'></input>
            <input idname="SearchButton" type="button" className='main-color search-button sub-color' value="Find"></input>
        </div>
    )
}

export default function Header(){
    return(
        <header>
            <h1 style={{color:'white'}}>BBsG</h1>
            <SearchBar />
            <button className='highlight-color button'>
                About us
            </button>
        </header>
    )
}
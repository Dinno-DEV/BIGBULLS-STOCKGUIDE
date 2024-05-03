import './Header.css'
import SearchBar from "../search-bar/SearchBar"
import AboutUsButton from '../about-us-button/AboutUsButton'

function Header({stockAlias}){
    return(
        <div style={{padding:"10px",flexGrow:"0"}}>
            <header className="header-container">
                <div className='header-background'></div>
                <div className='header'>
                    <h1><b>BIGBALLS</b><span style={{fontWeight:"100"}}>STOCKGUIDE</span></h1>
                    <hr />
                    <SearchBar stockAlias={stockAlias}></SearchBar>
                    <hr />
                    <AboutUsButton></AboutUsButton>
                </div>
                
            </header>
        </div>
    )
}

export default Header
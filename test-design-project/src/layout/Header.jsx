import './Header.css'
import SearchBar from "../search-bar/SearchBar"
import AboutUsButton from '../about-us-button/AboutUsButton'

function Header({stockAlias, show}){
    return(
        <div style={{padding:"10px",flexGrow:"0"}}>
            <header className="header-container">
                <div className='header-background'></div>
                <div className='header'>
                    <h1><b>BIGBULLS</b><span style={{fontWeight:"100"}}>STOCKGUIDE</span></h1>
                    <hr />
                    <SearchBar stockAlias={stockAlias}></SearchBar>
                    <hr />
                    <AboutUsButton show={show}></AboutUsButton>
                </div>
                
            </header>
        </div>
    )
}

export default Header
import "./LeftSidebarMenu.css"

function LeftSidebarMenu(){
    function handleButton1(){
        document.getElementById("tab-indicator").style.left = "3%"
        document.getElementById("tab-indicator").style.width = "52px"
    }
    function handleButton2(){
        document.getElementById("tab-indicator").style.left = "32%"
        document.getElementById("tab-indicator").style.width = "65px"
    }
    function handleButton3(){
        document.getElementById("tab-indicator").style.left = "68%"
        document.getElementById("tab-indicator").style.width = "62px"
    }

    return(
        <div style={{display:"flex",justifyContent:"center",padding:"15px"}}>
            <div className="left-sidebar-menu sub-color">
                <button className="button-1" onClick={handleButton1}>News</button>
                <button className="button-2" onClick={handleButton2}>Balance</button>
                <button className="button-3" onClick={handleButton3}>Income</button>
                <div id="tab-indicator"></div>
            </div>
        </div>
    )
}

export default LeftSidebarMenu
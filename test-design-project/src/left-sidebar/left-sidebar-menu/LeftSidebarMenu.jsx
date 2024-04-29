import { useState } from "react"
import "./LeftSidebarMenu.css"

function LeftSidebarMenu(){
    const [content,setContent] = useState("")

    function handleButton1(){
        document.getElementById("tab-indicator").style.left = "3%"
        document.getElementById("tab-indicator").style.width = "52px"
        setContent("news content")
    }
    function handleButton2(){
        document.getElementById("tab-indicator").style.left = "32%"
        document.getElementById("tab-indicator").style.width = "71px"
        setContent("balance content")
    }
    function handleButton3(){
        document.getElementById("tab-indicator").style.left = "68%"
        document.getElementById("tab-indicator").style.width = "67px"
        setContent("income content")
    }

    return(
        <>
            <div style={{display:"flex",justifyContent:"center",padding:"15px"}}>
                <div className="left-sidebar-menu sub-color">
                    <button className="button-1" onClick={handleButton1}>NEWS</button>
                    <button className="button-2" onClick={handleButton2}>BALANCE</button>
                    <button className="button-3" onClick={handleButton3}>INCOME</button>
                    <div id="tab-indicator"></div>
                </div>
            </div>
            <div className="content-area">
                {content}
            </div>
        </>
        
    )
}

export default LeftSidebarMenu
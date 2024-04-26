import "./LeftSidebar.css"
import LeftSidebarMenu from "./left-sidebar-menu/LeftSidebarMenu"
import { useState } from "react"
import React from "react"

function LeftSidebar(){
    
    function MyComponent(props){
        const [state, setState] = useState(1);
        return(
            <>
                <h1 style={{position:"relative"}}> {state} </h1>
                <button style={{position:"relative"}} onClick={()=> setState(state + 1)}> Press me </button>
            </>
        )
    }

    return(
        <div className="left-sidebar sub-color-2">
            <img src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg" alt="" />
            <LeftSidebarMenu />
            <MyComponent />
        </div>
    )
}


export default LeftSidebar
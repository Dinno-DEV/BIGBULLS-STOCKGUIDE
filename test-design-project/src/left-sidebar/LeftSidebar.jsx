import "./LeftSidebar.css"
import LeftSidebarMenu from "./left-sidebar-menu/LeftSidebarMenu"
import { useState } from "react"
import React from "react"


function LeftSidebar({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData}){
    return(
        <div className="left-sidebar sub-color-2">
            <img src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg" alt="" />
            <LeftSidebarMenu stockData={stockData} isStockExist={isStockExist} timeDuringFetch={timeDuringFetch} isLoading={isLoading} errorFetchingData={errorFetchingData}/>
        </div>
    )
}


export default LeftSidebar
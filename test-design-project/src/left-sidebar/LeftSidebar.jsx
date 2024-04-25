import "./LeftSidebar.css"
import LeftSidebarMenu from "./left-sidebar-menu/LeftSidebarMenu"

function LeftSidebar(){
    return(
        <div className="left-sidebar sub-color-2">
            <img src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg" alt="" />
            <LeftSidebarMenu />
        </div>
    )
}


export default LeftSidebar
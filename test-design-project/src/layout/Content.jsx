import "./Content.css"
import LeftSidebar from "../left-sidebar/LeftSidebar"
import RightSidebar from "../right-sidebar/RightSidebar"

function Content(){
    return(
        <div style={{flexGrow:"1",display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:"10px"}}>
            <div className="sidebar-l">
                <div style={{position:"absolute",height:"100%",width:"100%"}}>
                    <div style={{padding:"0 10px 0 0",height:"100%"}}>
                        <LeftSidebar />
                    </div>
                </div>
            </div>
            <div className="sidebar-r">
                <div style={{position:"absolute",height:"100%",width:"100%",overflow:'scroll',scrollBehavior:"smooth"}}>
                    <div style={{padding:"0 10px 0 10px"}}>
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content
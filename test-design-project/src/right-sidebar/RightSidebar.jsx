import GraphViewer from "../graph-viewer/GraphViewer"
import "./RightSidebar.css"

function RightSidebar(){
    return(
        <div className="right-sidebar">
            <h1>STN</h1>
            <p className="stock-information">00:00 / 000 | 00:00 / 000</p>
            <GraphViewer />
        </div>
    )
}

export default RightSidebar
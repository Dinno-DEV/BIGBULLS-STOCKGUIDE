import "./GraphViewer.css"
import MyLineGraph from "../chart-components/line"
import MyComponent from "../chart-components/bar"

function GraphViewer(){

    function moveIntervalSelector(thePosition,theWidth){
        document.getElementById("time-interval-selector").style.left = thePosition;
        document.getElementById("time-interval-selector").style.width = theWidth;
    }

    return(
        <>
            <div className="graph-info sub-color-2">
                <span>
                    <span style={{fontWeight:"100"}}>TIME</span><b>INTERVAL</b>
                </span>
                <span style={{position:"relative"}}>
                    <button onClick={()=>moveIntervalSelector("0px","65px")}> 30<b>MIN</b> </button>
                    <button onClick={()=>moveIntervalSelector("63px","65px")}> 60<b>MIN</b> </button>
                    <button onClick={()=>moveIntervalSelector("125px","59px")}> 24<b>HR</b> </button>
                    <div id="time-interval-selector"></div>
                </span>
            </div>
            <div className="graph-viewer sub-color">
                <div style={{width:"1000px", height:"97%"}}>
                    <MyLineGraph />
                </div>
            </div>
        </>
    )
}

export default GraphViewer
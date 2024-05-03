import "./GraphViewer.css"
import MyLineGraph from "../chart-components/line"
import MyComponent from "../chart-components/bar"
import { useState , useEffect } from "react";

function GraphViewer({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData}){
    const [interval,setInterval] = useState(0);
    const [graphWidth,setGraphWidth] = useState("2000px");

    function moveIntervalSelector(thePosition,theWidth,theKey){
        document.getElementById("time-interval-selector").style.left = thePosition;
        document.getElementById("time-interval-selector").style.width = theWidth;
        setInterval(theKey);
    }

    return(
        <>
            <div className="graph-info sub-color-2">
                <span>
                    <span style={{fontWeight:"100"}}>TIME</span><b>INTERVAL</b>
                </span>
                <span style={{position:"relative"}}>
                    <button onClick={()=>moveIntervalSelector("0px","65px",0)}> 30<b>MIN</b> </button>
                    <button onClick={()=>moveIntervalSelector("63px","65px",1)}> 60<b>MIN</b> </button>
                    <button onClick={()=>moveIntervalSelector("125px","59px",2)}> 24<b>HR</b> </button>
                    <div id="time-interval-selector"></div>
                </span>
            </div>
            <div className="graph-viewer sub-color">
                <div style={{width:graphWidth, height:"100%"}}>
                    <MyLineGraph stockData={stockData} isStockExist={isStockExist} timeDuringFetch={timeDuringFetch} isLoading={isLoading} errorFetchingData={errorFetchingData} interval={interval}/>
                </div>
            </div>
        </>
    )
}

export default GraphViewer
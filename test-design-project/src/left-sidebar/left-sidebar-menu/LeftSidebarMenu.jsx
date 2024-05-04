import { useState, useEffect } from "react"
import "./LeftSidebarMenu.css"
import { FaMale, FaUser } from "react-icons/fa"

function LeftSidebarMenu({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData}){
    const [currentTab,setCurrentTab] = useState(0);
    const [trigger,setTrigger] = useState(0)
    const [currentFin,setCurrentFin] = useState([])

    function handleButton1(){
        document.getElementById("tab-indicator").style.left = "3%";
        document.getElementById("tab-indicator").style.width = "52px";
        setCurrentTab(0);
    }
    function handleButton2(){
        document.getElementById("tab-indicator").style.left = "30%";
        document.getElementById("tab-indicator").style.width = "72px";
        setCurrentTab(1);
    }
    function handleButton3(){
        document.getElementById("tab-indicator").style.left = "66%";
        document.getElementById("tab-indicator").style.width = "74px";
        setCurrentTab(2);
    }

    function makeArray(amount){
        const myArray = []
        for (let i = 0; i < amount; i++){
            myArray.push(i);
        }
        return myArray
    }

    function currentFinance(){
        let financeTimes = Object.keys(stockData.CurrentFin);
        let theIndex = 0;
        let financials = [];
        for (const finances in financeTimes){
            financials.push(stockData.CurrentFin[financeTimes[theIndex]]);
            financials[theIndex]["Time Recorded"] = financeTimes[theIndex];
            theIndex ++;
        }
        return financials
    }

    function AnalystGrades(){
        const content = stockData.AnalysisGrades.map((theGrades,key)=><>
            <div className="analysis-panel sub-color">
                <p>{theGrades.GradeDate}</p>
                <div>
                    <h1>{theGrades.Firm}</h1>
                    <h2>{theGrades.ToGrade.toUpperCase()}</h2>
                </div>
            </div>
        </>)
        return(content)
    }

    useEffect(()=>{
        makeArray(3);
        if (trigger != 0){
            setCurrentFin(currentFinance);
        }
        setTrigger(trigger+1)
    },[isStockExist])
    
    return(
        <>
            <div className="sub-color-2" style={{display:"flex",justifyContent:"center",padding:"15px"}}>
                <div className="left-sidebar-menu sub-color">
                    <button className="button-1" onClick={handleButton1}>NEWS</button>
                    <button className="button-2" onClick={handleButton2}>FINANCE</button>
                    <button className="button-3" onClick={handleButton3}>ANALYSIS</button>
                    <div id="tab-indicator"></div>
                </div>
            </div>
            <div className="content-area">
                {
                    isStockExist?
                    (<>
                        {
                            currentTab == 0?
                            (<>
                                <h1>News</h1>
                                {
                                    stockData.CurrentNews.map((theNews, key)=>
                                        <div className="news-panel" key={key}>
                                            <div className="news-header">
                                                <h3><a href={theNews.link} target="_blank">{theNews.title}</a></h3>
                                                <p>by {theNews.publisher}</p>
                                            </div>
                                            {
                                                theNews.thumbnail != null?
                                                (<>
                                                    <img src={theNews.thumbnail.resolutions[0].url} alt={theNews.title} className="news-thumbnail" />
                                                </>):
                                                (<>
                                                </>)
                                            }
                                            <div className="news-related-tickers"> 
                                                <i>Related stocks:</i>
                                                {
                                                    theNews.relatedTickers != null?
                                                    theNews.relatedTickers.map((ticker,key)=><span className="highlight-color-2" key={key}>{ticker}</span>):
                                                    (<>
                                                    </>)
                                                }
                                            </div>
                                            <br />
                                            <br />
                                            <hr />
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }
                            </>):currentTab == 1?
                            (<>
                                <h1>Finance</h1>
                                {
                                    currentFin.map((theFinance,key)=>
                                        <div className="finance-panel sub-color" key={key}>
                                            <h2>{theFinance["Time Recorded"] != "NA"? theFinance["Time Recorded"] : "No data"}</h2>
                                            <table>
                                                <tr>
                                                    <td>Cost of revenue</td>
                                                    <td>
                                                        {
                                                            theFinance["Cost Of Revenue"] != "NA"?
                                                            `${new Intl.NumberFormat().format(theFinance["Cost Of Revenue"])} ${stockData.Currency}`
                                                            :
                                                            "No data"
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Gross profit</td>
                                                    <td>
                                                        {
                                                            theFinance["Gross Profit"] != "NA"?
                                                            `${new Intl.NumberFormat().format(theFinance["Gross Profit"])} ${stockData.Currency}`
                                                            :
                                                            "No data"
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Net income</td>
                                                    <td>
                                                        {
                                                            theFinance["Net Income"] != "NA"?
                                                            `${new Intl.NumberFormat().format(theFinance["Net Income"])} ${stockData.Currency}`
                                                            :
                                                            "No data"
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Operating revenue</td>
                                                    <td>
                                                        {
                                                            theFinance["Operating Revenue"] != "NA"?
                                                            `${new Intl.NumberFormat().format(theFinance["Operating Revenue"])} ${stockData.Currency}`
                                                            :
                                                            "No data"
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Total expenses</td>
                                                    <td>
                                                        {
                                                            theFinance["Total Expenses"] != "NA"?
                                                            `${new Intl.NumberFormat().format(theFinance["Total Expenses"])} ${stockData.Currency}`
                                                            :
                                                            "No data"
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Total revenue</td>
                                                    <td>
                                                        {
                                                            theFinance["Total Revenue"] != "NA"?
                                                            `${new Intl.NumberFormat().format(theFinance["Total Revenue"])} ${stockData.Currency}`
                                                            :
                                                            "No data"
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }

                            </>):currentTab == 2?
                            (<>
                                <br />
                                <div className="recommendation-title">
                                    <h1>Recommendations</h1>
                                    <h2 style={
                                        stockData.RecommendationSummary != "sell"?
                                        stockData.RecommendationSummary != "hold"?
                                        {color:"green"}:
                                        {color:"yellow"}:
                                        {color:"red"}
                                    }>
                                        {stockData.RecommendationSummary.toUpperCase()}
                                    </h2>
                                </div>
                                <br />
                                {
                                    stockData.Recommendtations.map((theRec, key)=> <>
                                        <div className="recommendation-panel sub-color" key={key}>
                                            <h2>{
                                                parseInt(theRec.period) == 0? "This Month" : 
                                                parseInt(theRec.period) == -1? "Last month" :
                                                parseInt(theRec.period) == -2? "2nd Last month":
                                                parseInt(theRec.period) == -3? "3rd Last month"
                                                :"-"
                                            }</h2>
                                            <div className="recommendations">
                                                <div>{
                                                    makeArray(parseInt(theRec.buy)).map((theNumber,key)=>
                                                        <FaUser key={key}/>
                                                    )
                                                }</div>
                                                <p> {`${theRec.buy} ${parseInt(theRec.buy) > 1? "analyst" : "analyst"} recommends buying`} </p>
                                            </div>
                                            <hr />
                                            <div className="recommendations">
                                                <div>{
                                                    makeArray(parseInt(theRec.sell)).map((theNumber,key)=>
                                                        <FaUser key={key}/>
                                                    )
                                                }</div>
                                                <p> {`${theRec.sell} ${parseInt(theRec.sell) > 1? "analyst" : "analyst"} recommends selling`} </p>
                                            </div>
                                            <hr />
                                            <div className="recommendations">
                                                <div>{
                                                    makeArray(parseInt(theRec.hold)).map((theNumber,key)=>
                                                        <FaUser key={key}/>
                                                    )
                                                }</div>
                                                <p> {`${theRec.hold} ${parseInt(theRec.hold) > 1? "analyst" : "analyst"} recommends holding`} </p>
                                            </div>
                                            <hr />
                                            <div className="recommendations">
                                                <div>{
                                                    makeArray(parseInt(theRec.strongBuy)).map((theNumber,key)=>
                                                        <FaUser key={key}/>
                                                    )
                                                }</div>
                                                <p> {`${theRec.strongBuy} ${parseInt(theRec.strongBuy) > 1? "analyst" : "analyst"} strongly recommends buying`} </p>
                                            </div>
                                            <hr />
                                            <div className="recommendations">
                                                <div>{
                                                    makeArray(parseInt(theRec.strongSell)).map((theNumber,key)=>
                                                        <FaUser key={key}/>
                                                    )
                                                }</div>
                                                <p> {`${theRec.strongSell} ${parseInt(theRec.strongSell) > 1? "analyst" : "analyst"} strongly recommends selling`} </p>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                        <br />
                                    </>)
                                }
                                <br />
                                <h1>Analyst Grades</h1>
                                <AnalystGrades></AnalystGrades>
                            </>):
                            (<>
                            </>)
                        }
                    </>): errorFetchingData?
                    (<>
                        <p>Stock data not found</p>
                    </>):
                    (<>
                        <p>Loading..</p>
                    </>)
                }
            </div>
            
            
        </>
        
    )
}

export default LeftSidebarMenu
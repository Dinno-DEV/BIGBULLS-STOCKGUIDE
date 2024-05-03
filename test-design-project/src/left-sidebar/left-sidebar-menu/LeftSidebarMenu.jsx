import { useState, useEffect } from "react"
import "./LeftSidebarMenu.css"

function LeftSidebarMenu({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData}){
    const [currentTab,setCurrentTab] = useState(0);

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
                                    stockData.CurrentNews.map((theNews)=>
                                        <div className="news-panel">
                                            <br />
                                            <br />
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
                                            <div className="news-related-tickers"> <i>Related:</i> {theNews.relatedTickers.map((ticker)=><span className="highlight-color-2">{ticker} </span>)}</div>
                                            <br />
                                            <br />
                                            <hr />
                                        </div>
                                    )
                                }
                            </>):currentTab == 1?
                            (<>
                                <h1>Finance</h1>

                            </>):currentTab == 2?
                            (<>
                                <h1>Analysis</h1>
                                
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
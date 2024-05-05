import { Colors } from "chart.js"
import GraphViewer from "../graph-viewer/GraphViewer"
import "./RightSidebar.css"
import { useEffect } from "react"

function RightSidebar({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData, effectTrigger}){
    return(
        <div className="right-sidebar">
            {
                isStockExist?
                (<>
                    <h1>
                        {stockData.StockSym}
                        <span> {stockData.StockName}</span>
                    </h1>
                    <p className="stock-information">
                        <b> LAST CLOSE {stockData.PrevClose} {stockData.Currency}  </b> 
                        <i>|</i>
                        <b> OPEN {stockData.CurrentPrice} {stockData.Currency}  </b> 
                        at 
                        <i> {timeDuringFetch}</i>
                        <i> | </i>
                        {
                            parseFloat(stockData.PrecentDiff.substr(0,5)) < 0?
                            (
                                <i style={{color:'rgb(200,0,0)'}}> <span style={{backgroundColor:'rgb(75,0,0)', padding:'0 10px 2px', borderRadius:"15px"}}>%&Delta;</span> {stockData.PrecentDiff.substr(0,5)}% </i>
                            ):
                            (
                                <i style={{color:'rgb(0,200,0)'}}> <span style={{backgroundColor:'rgb(0,75,0)', padding:'0 10px 2px', borderRadius:"15px"}}>%&Delta;</span> {stockData.PrecentDiff.substr(0,5)}% </i>
                            )
                        }
                    </p>
                </>): errorFetchingData?
                (<>
                    <h1>Stock Data Not Found</h1>
                    <p className="stock-information">Data not found</p>
                </>):effectTrigger == 0?
                (<>
                    <h1>Search to fetch data</h1>
                    <p className="stock-information">Search stock to reveal data</p>
                </>):
                (<>
                    <h1>Loading..</h1>
                    <p className="stock-information">Loading..</p>
                </>)
            }
            <br />
            <GraphViewer stockData={stockData} isStockExist={isStockExist} timeDuringFetch={timeDuringFetch} isLoading={isLoading} errorFetchingData={errorFetchingData}/>
            <h2>Predicted Price</h2>
            <div className="predicted-price-panel">
                <div className="sub-color">
                    <p className="sub-color-2">{timeDuringFetch} + <i>30m</i></p>
                    <hr className="sub-color"/>
                    <p className="predicted-price"><i>{isStockExist?`${stockData.PredictedPrice_30M.substr(0,7)} ${stockData.Currency}`:effectTrigger == 0? `Search to fetch data` :`Loading`}</i></p>
                </div>
                <div className="sub-color">
                    <p className="sub-color-2">{timeDuringFetch} + <i>60m</i></p>
                    <hr className="sub-color"/>
                    <p className="predicted-price"><i>{isStockExist?`${stockData.PredictedPrice_60M.substr(0,7)} ${stockData.Currency}`:effectTrigger == 0? `Search to fetch data` :`Loading`}</i></p>
                </div>
                <div className="sub-color">
                    <p className="sub-color-2">{timeDuringFetch} + <i>24h</i></p>
                    <hr className="sub-color"/>
                    <p className="predicted-price"><i>{isStockExist?`${stockData.PredictedPrice_1D.substr(0,7)} ${stockData.Currency}`:effectTrigger == 0? `Search to fetch data` :`Loading`}</i></p>
                </div>
            </div>

            <h2>Target Price</h2>
            <div className="target-price sub-color-2">
                <div>
                    <h3>Target Mean Price</h3>
                    <p>{ isStockExist? `${stockData.TargetMeanPrice} ${stockData.Currency}` : effectTrigger == 0? `Search to fetch data` : `Loading`}</p>
                </div>
                <div>
                    <h3 style={{borderWidth:"0 0 0 2px", borderStyle:"solid"}}>Target Median Price</h3>
                    <p style={{borderWidth:"2px 0 0 2px", borderStyle:"solid"}}>{ isStockExist? `${stockData.TargetMedianPrice} ${stockData.Currency}` : effectTrigger == 0? `Search to fetch data` : `Loading`}</p>
                </div>
            </div>

            <h2>General Information</h2>
            {
                isStockExist?
                (<>
                    <table className="general-information-tab">
                        <tr>
                            <td>Company Name</td>
                            <td>{stockData.StockName != "NA"? stockData.StockName : `-`}</td>
                        </tr>
                        <tr>
                            <td>Industry</td>
                            <td>{stockData.Industry != "NA"? stockData.Industry : `-`}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>
                                {
                                    stockData.Website != "NA"?
                                    (<>
                                        <a href={stockData.Website}>{stockData.Website}</a>
                                    </>):
                                    (<>
                                        Not found
                                    </>)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>
                                {
                                    stockData.Phone != "NA"?
                                    (<>
                                        <a href={stockData.Phone}>{stockData.Phone}</a>
                                    </>):
                                    (<>
                                        Not found
                                    </>)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Marketcap</td>
                            <td>
                                {
                                    stockData.MarketCap != "NA"?
                                    (<>
                                        {new Intl.NumberFormat().format(stockData.MarketCap)} {stockData.Currency}
                                    </>):
                                    (<>
                                        Not found
                                    </>)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Timezone</td>
                            <td>{stockData.TimeZone != "NA"? stockData.TimeZone : `-`}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{stockData.Country != "NA"? stockData.Country : `-`}</td>
                        </tr>
                        <tr>
                            <td>City, State</td>
                            <td>{`${stockData.City != "NA"? stockData.City : `-`}, ${stockData.State != "NA"? stockData.State : `-`}`}</td>
                        </tr>
                        <tr>
                            <td>Important Name</td>
                            <td>{`${stockData.ImpEmp_ToKnow_Name != "NA"? stockData.ImpEmp_ToKnow_Name : `Name not found`}, ${stockData.ImpEmp_ToKnow_Title != "NA"? stockData.ImpEmp_ToKnow_Title : `Title not found`}`}</td>
                        </tr>
                    </table>
                </>): errorFetchingData?
                (<>
                    <p style={{marginTop:"0px"}}>Data not found</p>
                </>): effectTrigger == 0?
                (<>
                    <p style={{marginTop:"0px"}}>Search to fetch data</p>
                </>):
                (<>
                    <p style={{marginTop:"0px"}}>Loading..</p>
                </>)
            }
        </div>
    )
}

export default RightSidebar
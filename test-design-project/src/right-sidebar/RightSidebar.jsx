import { Colors } from "chart.js"
import GraphViewer from "../graph-viewer/GraphViewer"
import "./RightSidebar.css"
import { useEffect } from "react"

function RightSidebar({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData}){
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
                        <b>{stockData.CurrentPrice} {stockData.Currency}  </b> 
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
                </>):
                (<>
                    <h1>Loading..</h1>
                    <p className="stock-information">Loading..</p>
                </>)
            }
            <GraphViewer />
            <h2>Predicted Price</h2>
            <div className="predicted-price-panel">
                <div className="sub-color">
                    <p className="sub-color-2">{timeDuringFetch} + <i>30m</i></p>
                    <hr className="sub-color"/>
                    <p className="predicted-price"><i>{isStockExist?`${stockData.PredictedPrice_30M.substr(0,6)} ${stockData.Currency}`:`Loading`}</i></p>
                </div>
                <div className="sub-color">
                    <p className="sub-color-2">{timeDuringFetch} + <i>60m</i></p>
                    <hr className="sub-color"/>
                    <p className="predicted-price"><i>{isStockExist?`${stockData.PredictedPrice_60M.substr(0,6)} ${stockData.Currency}`:`Loading`}</i></p>
                </div>
                <div className="sub-color">
                    <p className="sub-color-2">{timeDuringFetch} + <i>24h</i></p>
                    <hr className="sub-color"/>
                    <p className="predicted-price"><i>{isStockExist?`${stockData.PredictedPrice_1D.substr(0,6)} ${stockData.Currency}`:`Loading`}</i></p>
                </div>
            </div>

            <h2>General Information</h2>
            {
                isStockExist?
                (<>
                    <table className="general-information-tab">
                        <tr>
                            <td>Company Name</td>
                            <td>{stockData.StockName}</td>
                        </tr>
                        <tr>
                            <td>Industry</td>
                            <td>{stockData.Industry}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><a href={stockData.Website}>{stockData.Website}</a></td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td><a href={`tel:${stockData.Phone}`}>{stockData.Phone}</a></td>
                        </tr>
                        <tr>
                            <td>Marketcap</td>
                            <td>{new Intl.NumberFormat().format(stockData.MarketCap)} {stockData.Currency}</td>
                        </tr>
                        <tr>
                            <td>Timezone</td>
                            <td>{stockData.TimeZone}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{stockData.Country}</td>
                        </tr>
                        <tr>
                            <td>City, State</td>
                            <td>{`${stockData.City}, ${stockData.State}`}</td>
                        </tr>
                        <tr>
                            <td>Important Name</td>
                            <td>{`${stockData.ImpEmp_ToKnow_Name}, ${stockData.ImpEmp_ToKnow_Title}`}</td>
                        </tr>
                    </table>
                </>): errorFetchingData?
                (<>
                    <p style={{marginTop:"0px"}}>Data not found</p>
                </>):
                (<>
                    <p style={{marginTop:"0px"}}>Loading..</p>
                </>)
            }
        </div>
    )
}

export default RightSidebar
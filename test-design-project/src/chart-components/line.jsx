import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Colors,
    plugins,
    scales
} from 'chart.js'
import { useState, useEffect } from 'react'

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Colors
)

function MyLineGraph({stockData, isStockExist, timeDuringFetch, isLoading, errorFetchingData, interval}){
    
    function getXChart(){
        if(interval == 0){
            return stockData.GraphData30MX
        }else if(interval == 1){
            return stockData.GraphData60MX
        }else if(interval == 2){
            return stockData.GraphData1dX
        }
    }

    function getYChart(){
        if(interval == 0){
            return stockData.GraphData30MY
        }else if(interval == 1){
            return stockData.GraphData60MY
        }else if(interval == 2){
            return stockData.GraphData1dY
        }
    }

    const myOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                title: {
                    text: stockData.Currency,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
    const myData = {
        labels: getXChart(),
        datasets: [
            {
                label: stockData.Currency,
                data: getYChart(),
                borderWidth: 1,
                borderColor: '#f9f7f275',
                backgroundColor: '#f9f7f2',
                fill: {
                    target: 'origin',
                    above: '#ffffff15',
                    below: '#ffffff15'
                },
                tension: 0,
                pointStyle: 'rect'
            }
        ]
    }
    return(
        <Line options={myOptions} data={myData}/>
    )
}

export default MyLineGraph
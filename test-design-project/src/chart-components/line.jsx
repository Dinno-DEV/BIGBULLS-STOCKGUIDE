import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Colors
} from 'chart.js'

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Colors
)

function MyLineGraph(){
    const myOptions = {
        maintainAspectRatio: false
    }
    const myData = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        datasets: [
            {
                label: "Closing Price",
                data: [2,3,5,2,4,8,1,7,5,7,8,4,5,3,3,5,6,7,6,4,3,2,4,5,7,8,8,6,4,2,6,4,3,2,3,4,5,6,3,2,3,4,5,2],
                borderWidth: 1,
                borderColor: '#f9f7f2',
                backgroundColor: '#f9f7f2',
                fill: {
                    target: 'origin',
                    above: '#ffffff20',
                    below: '#ffffff20'
                }
            }
        ]
    }
    return(
        <Line options={myOptions} data={myData}/>
    )
}

export default MyLineGraph
import Chart from 'chart.js/auto'

function MyComponent(){

    const ctx = document.getElementById("lineCanvas");

    new Chart(ctx,{
        type: 'line',
        data:{
            labels: ['a','b','c','d','e','f','g','h','i','j','k','l'],
            datasets: [
                {
                    label: "Name",
                    data: [2,3,5,7,23,32,5,7],
                    borderWidth: 1
                },
            ]
        },
        options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
    })

    return(
        <canvas id="lineCanvas" width="1000px" height="200px"></canvas>
    )
}

export default MyComponent
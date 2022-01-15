import React from 'react'
import ApexCharts from 'react-apexcharts'

const ApexPieChart = () => {

    const series = [44, 55, 41, 17, 15];

    const chartSettings = {
        responsive: [{
            
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom',
                
              }
            }
        }]
    }

    return (
        <>

            <ApexCharts 
                options={chartSettings}
                series={series}
                type='donut'

            />
            
        </>
    )
}

export default ApexPieChart

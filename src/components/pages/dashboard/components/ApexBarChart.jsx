import React from 'react'
import ApexCharts from 'react-apexcharts'

const ApexBarChart = () => {

    const series = [
        {
            name: 'Total population',
            data: [400, 430, 448, 470, 540]
        }
    ];

    const chartSettings = {
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
        },
        xaxis: {
            categories: [
                'Mon', 'Tue', 'Wed', 'Thurs', 'Fri'
            ],
        },
        title: {
            text: 'Students attendance',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: 'font-metropolisbold',
                color: '#C35214',
            },
        },
    };

    return (
        <>

            <ApexCharts 
                options={chartSettings}
                series={series}
                type='bar'
                height={200}
            />
            
        </>
    )
}

export default ApexBarChart

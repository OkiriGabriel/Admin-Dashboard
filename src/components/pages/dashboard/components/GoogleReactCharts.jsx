import React from 'react'
import { Chart } from "react-google-charts";

const GoogleReactCharts = () => {

    const chartOptions = {
        chart: {
            title: 'Client Stats',
            subtitle: '',
        },
        colors: ['#08217C', '#00FFFF'],
    };

    const chartData = [
        [ '', 'Males', 'Females'],
        ['2016', 1000, 400],
        ['2018', 1170, 460],
        ['2019', 660, 1120],
        ['2020', 1030, 540],
        ['2021', 1398, 640],
        ['2022', 1830, 910],
      
    ]

    return (
        <>

            <Chart
                width={'100%'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={chartOptions}
                
                // For tests
                rootProps={{ 'data-testid': '2' }}
            />
            
        </>
    )
}

export default GoogleReactCharts

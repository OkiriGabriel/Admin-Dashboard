import React from 'react'
import ApexCharts from 'react-apexcharts'

const ApexBounceChart = () => {

    const series = [57]

    const chartSettings = {
        colors: ['#08217C'],
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 0
              }
            }
          }
        },
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        },
        title: {
          text: 'Total number of students',
          align: 'left',
          style: {
            color: '#020B2C',
            fontSize: '16px',
            fontWeight: 500,
            fontFamily: 'font-metropolisbold',
          },
        },
        zoom: {
          enabled: false
        },
        offsetY: 20
        
    }

    return (
        <>

            <ApexCharts
                options={chartSettings}
                series={series}
                type='radialBar'
                height={215}
                
            />
            
        </>
    )
}

export default ApexBounceChart

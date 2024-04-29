import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';


const ChartComponent: React.FC = () => {
  useEffect(() => {
    let chart: ApexCharts | null = null;

    const ProductsSell: number[] = [20, 60, 80, 40, 60, 100, 60, 50, 30, 10, 50, 60];
    

    const options = {
      series: [
        {
          name: "Sản phẩm",
          color: "#31C48D",
          data: ProductsSell
        },

      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 490,
        toolbar: {
          show: false,
        }
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: function (value: string) {
          return value
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          },
          formatter: function (value: string) {
            return value
          }
        },
        categories: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        }
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20
        },
      },
    };

    if (document.getElementById("bar-chart") && typeof ApexCharts !== "undefined") {
        chart = new ApexCharts(document.getElementById("bar-chart"), options);
        chart.render();
  
      }

    return () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return <div id="bar-chart" />;
};

export default ChartComponent;

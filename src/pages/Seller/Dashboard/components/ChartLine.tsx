import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';

const ChartLineComponent: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const chartRef = useRef<ApexCharts | null>(null);
  useEffect(() => {
    
    
    const options = {
        chart: {
        height: "100%",
        maxWidth: "100%",
        type: "line",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        },
        tooltip: {
        enabled: true,
        x: {
            show: false,
        },
        },
        dataLabels: {
        enabled: false,
        },
        stroke: {
        width: 6,
        curve: 'smooth',
        },
        grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
        },
        series: [
        {
            name: "Đơn hàng",
            data: [0, 0, 3, 0, 0, 0, 0],
            color: "#c74c09",
        },
        ],
        legend: {
        show: false
        },
        xaxis: {
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
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
        axisBorder: {
            show: false,
        },
        axisTicks: {
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
            },
        },
    }
    
    if (!chartRef.current) {
        chartRef.current = new ApexCharts(document.getElementById("line-chart"), options);
        chartRef.current.render();
      }
  
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }
      };
    }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-3">
            <div className="flex justify-between mb-2">
                <div className="space-y-2">
                    <p className="text-gray-900 dark:text-white text-xl leading-none font-bold">Tổng quan cửa hàng</p>
                    <p className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none mb-2">Tuần này
                    </p>
                </div>  
                <div>
                <button id="dropdownDefaultButton"
                onClick={toggleDropdown}
                    data-dropdown-toggle="lastDaysdropdown"
                    data-dropdown-placement="bottom" type="button" className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Tuần này <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg></button>
                <div id="lastDaysdropdown" className={`z-10 ${isDropdownOpen ? '' : 'hidden'} w-auto absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                        </li>
                    </ul>
                </div>
                </div>
            </div>

            <div className='flex mb-5'>
                <div className="hover-effect text-center px-3 border-b-2 border-orange-500">
                    <p className="text-gray-900 dark:text-white text-xl leading-none font-bold">3</p>
                    <p className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none mb-2 text-sm"> Đơn hàng</p>
                </div>
                <div className='text-center px-3'>
                    <p className="text-gray-900 dark:text-white text-xl leading-none font-bold">1.2Tr</p>
                    <p className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none mb-2 text-sm"> Doanh thu</p>
                </div>
            </div>

            <div className='mt-10' id="line-chart"></div>

        </div>

  );
};

export default ChartLineComponent;

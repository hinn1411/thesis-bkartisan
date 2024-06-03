import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { useMonthlyRevenue } from '../Hooks/useQueryReport';
import Loading from '../../ManageProducts/Components/OnLoading';
import { IChartReport } from '@apis/apiReportSeller';

interface ChartComponentProps {
  year: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ year }) => {
  const { data, isSuccess, isFetching } = useMonthlyRevenue(year);

  useEffect(() => {
    let chart: ApexCharts | null = null;

    const generateChartData = (dataChart: IChartReport[]) => {
      const chartData = Array.from({ length: 12 }, () => ({ totalRevenue: 0, totalQuantity: 0 }));
      if (Array.isArray(dataChart)) {
        dataChart.forEach(({ month, totalRevenue, totalQuantity }) => {
          chartData[month - 1] = { totalRevenue: parseFloat(totalRevenue), totalQuantity: parseInt(totalQuantity) };
        });
      }
      return chartData;
    };

    if (isSuccess && !isFetching) {
      const dataChart: IChartReport[] = data?.result || [];
      const chartData = generateChartData(dataChart);
      const RevenueData = chartData.map(item => item.totalRevenue/1000000);

      const options = {
        series: [
          {
            name: "Doanh thu",
            color: "#FF4560",
            data: RevenueData,
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
          },
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
            return value + " Triệu";
          },
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
            },
            formatter: function (value: string) {
              return value;
            },
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
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
            },
            min: 0, // Ensure y-axis starts at 0
            max: Math.max(...RevenueData) + 1, // Set max to the highest value in the dataset + 1
          }
        },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -20,
          },
        },
      };

      if (document.getElementById("bar-chart") && typeof ApexCharts !== "undefined") {
        chart = new ApexCharts(document.getElementById("bar-chart"), options);
        chart.render();
      }
    }

    return () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  }, [data, isSuccess, isFetching]);

  return (
    <div>
      {isFetching && <Loading />}
      {isSuccess && !isFetching && <div id="bar-chart" />}
    </div>
  );
};

export default ChartComponent;

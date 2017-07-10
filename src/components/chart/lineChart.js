import PropTypes from 'prop-types';
import classnames from 'classnames';
// import styles from './lineChart.less';
import Chart from 'chart.js';
// import GM from 'g2-mobile';
// import echarts from 'echarts';
import './lineChart.less';

class lineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount () {
        Chart.defaults.global.defaultFontSize = 30;
        let datapoints1 = [4, 4.2, 4.6, 4.9, 5.2, 5.7, 5.3];
        let datapoints2 = [5.2, 5.7, 5.6, 6.0, 6.7, 7, 5.4];
		let config = {
            type: 'line',
            data: {
                labels: ["2", "4", "6", "8", "10", "12","14"],
                datasets: [{
                    label: "批发价",
                    data: datapoints1,
                    borderColor: '#369be9',
					backgroundColor: 'rgba(54,155,233,0.3)',
                    fill: true,
					cubicInterpolationMode: 'monotone',
                    // showLine: false, // disable for a single dataset
                }, {
                    label: "零售价",
                    data: datapoints2,
                    borderColor: '#ff6511',
					backgroundColor: 'rgba(255,101,17,0.2)',
                    fill: true,
                    cubicInterpolationMode: 'monotone'
                }]
            },
            options: {
                responsive: true,
                title:{
                    display:false,
                    text:'价格趋势图'
                },
                legend: {
                    display: false
                },                
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                tooltips: {
                    mode: 'index'
                },               
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '时间/日',
                            // fontSize: 35
                        },
                        gridLines: {
                            display: true,
                            // tickMarkLength: 6
                        }
                    }],
                    yAxes: [{
                        display: true,
                        // stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: '元/升',
                            // fontSize: 35
                        },
                        gridLines: {
                            display: true,
                            // tickMarkLength: 6
                        },
                        ticks: {
                            beginAtZero:false,
                            stepSize: 0.5,
                            suggestedMin: 4.0,
                            min: 4.0,
                            suggestedMax: 8.0,
                            //format
                            callback: function(value, index, values) {
                                value = Number(value).toFixed(1);
                                return value
                            }
                        }
                    }]
                }
            }
        };
        let ctx = this.refs.myChart.getContext("2d");
        new Chart(ctx, config);
    }

    render() {
        return (
            <div  className="chart">
                <canvas id="myChart" ref="myChart"></canvas>
            </div>
        )
    }
}

export default lineChart;


    /* let option = {
                title: {
                    // text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    // data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                toolbox: {
                    feature: {
                        // saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        // name: '时间/日',
                        nameTextStyle: {
                            // color: '#ccc',
                            fontStyle: 'normal',
                            // fontSize: 8
                        },
                        nameGap: 0,
                        boundaryGap : false,
                        data : ['12','14','16','18','20','22','24'],
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        offset: -3           
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine: {
                            show: false
                        },
                        // name: '元/升',
                        nameTextStyle: {
                            // color: '#ccc',
                            fontStyle: 'normal',
                            // fontSize: 8
                        },
                        nameGap: 10,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            
                        },
                        axisTick: {
                            show: false,
                            interval: 1,
                            length: 10
                        },
                        minInterval: 0.5,
                        // interval: 0.5,
                        position: 'left',
                        min: 4
                    }
                ],
                series : [
                    {
                        name:'零售价',
                        type:'line',
                        stack: '总量',
                        lineStyle: {
                            normal: {
                                color: '#369be9'
                            }
                        },
                        axisLine: {
                            onZero: false
                        },
                        areaStyle: {normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#369be9' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                        }},
                        smooth: true,//圆润曲线
                        showSymbol: false,//隐藏圆点
                        data:[4.5, 4.55, 4.56, 4.66, 5.46, 5.61, 5.46]
                    },
                    {
                        name:'批发价',
                        type:'line',
                        stack: '总量',
                        lineStyle: {
                            normal: {
                                color: '#ff6511'
                            }
                        },
                        axisLine: {
                            onZero: false
                        },                    
                        areaStyle: {normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#ff6511' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                        }},
                        smooth: true,//圆润曲线
                        showSymbol: false,//隐藏圆点
                        data:[1.5, 1.6, 1.7, 1.8,2.1, 2.45,1.95]
                    }
                ]
            };
            const myChart = echarts.init(this.refs.myChart);

            myChart.setOption(option);*/
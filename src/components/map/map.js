import React,{Component} from 'react';
import echarts from "echarts";
import {mapJson,geoCoordMap} from './chinaJSON.js';
import https from "../../utils/https";
import urls from "../../utils/urls";

const convertData = (data) => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                value: geoCoord.concat(data[i].value),
                name: data[i].name,
            });
        }
    }
    return res;
};

class LayoutImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loaded:false,
            vmData:[
                {name: '长春', value: 125.35,num:43.88}/*,

                {name: '上海', value: 121.48,num:31.22}*/
            ]
        }
       /* this.handleSearch=this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);*/
    }


    handleSearch() {
        this.setState({
            isLoading: true,
        });
        https.post(
            urls.getmapList,
        ).then(res => {
                if (res.status === 200 && res.data.code === 0) {


                    this.setState({
                        isLoading: false,
                    });
                    this.setState({
                        vmData:res.data.data,
                    });
                    this.initMapDidMount();
                } else {
                   this.message.error(res.data.message, 1);
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                });
                console.error(err);
            });
    }
    componentDidMount() {
        if (this.props.location.pathname === '/map') {
            this.setState(
                {
                    likes: true,
                },
                () => {
                    this.handleSearch();
                },
            );
        } else {
            this.handleSearch();
        }
    }
    componentWillMount(){
        this.setState(

            () => {
                this.handleSearch();
            },
        );
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    initMapDidMount(){
        echarts.registerMap('china', mapJson); // 注册地图

        var mapChart = echarts.init(this.refs.map);

        var option = {
            backgroundColor: '#404a59',
            title: {
                text: '访客分布',
                // subtext: '点击进入',
                // sublink: 'http://www.baidu.com/',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: function (params) {      //格式化鼠标指到点上的弹窗返回的数据格式
                    return params.name + ' : ' + params.value[2];
                }
            },
            geo: {         //地里坐标系组件（相当于每个省块）
                map: 'china',
                roam:true,      //是否开启缩放
                label: {
                    emphasis: {        //鼠标划到后弹出的文字 显示省份
                        color: '#FF0000',    //高亮背景色
                        show: true,       //是否高亮显示
                        fontSize:12       //字体大小
                    }
                },
                itemStyle: {         //坐标块本身
                    normal: {         //坐标块默认样式控制
                        areaColor: '#323c48',  //坐标块儿颜色
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#79FF79'  //放坐标块儿上，块儿颜色
                    }
                }
            },
            series: [
                {
                    name: '信息',   // series名称
                    type: 'effectScatter',    // series图表类型
                    effectType: 'ripple',     // 圆点闪烁样式，目前只支持ripple波纹式
                    coordinateSystem: 'geo',   // series坐标系类型
                    data:convertData(this.state.vmData),// series数据内容
                    showEffectOn: 'emphasis',    //配置何时显示特效 render 一直显示，emphasis放上去显示
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    rippleEffect: {        // ripple的样式控制
                        brushType: 'stroke',
                        color: '#28FF28',
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true   //显示位置信息，
                        }
                    },

                    itemStyle: {         //散点本身显示控制
                        normal: {
                            color: '#28FF28',
                            shadowBlur: 10,
                            shadowColor: '#28FF28'
                        }
                    },
                    zlevel: 1
                }
            ],
            symbolSize: 12,
        }
        if (option && typeof option === "object") {
            mapChart.setOption(option);
        }
    }
    render() {
        return (
            <div className="cloudhost-box">
                <div ref="map" style={{width: '1100px',height: '550px',mergeLeft:"0px"}} />
            </div>

        );
    }

}

export default LayoutImg;
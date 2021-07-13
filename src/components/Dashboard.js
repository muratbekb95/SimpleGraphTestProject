import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createClass from 'create-react-class';
import '../static/css/Dashboard.css';
import Close from '../static/assets/img/Close.svg';
import Download from '../static/assets/img/Download.svg';
import Resize from '../static/assets/img/Resize.svg';
import Settings from '../static/assets/img/Settings.svg';
import Link from '../static/assets/img/Link.svg';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as d3 from 'd3';

const Dashboard = () => {

    var data = [
        {category: "Выпуск карты", value: 55},
        {category: "Открытие депозита", value: 26},
        {category: "Кредиты", value: 30},
        {category: "Закрытие карты", value: 80}
    ];

    var current_tasks = [
        {number: 15632, operation: "Одобрение карты", status: "Обработана", author: "u11827 (Белов А.В.)"},
        {number: 14475, operation: "Выдача карты", status: "Новая", author: "u11827 (Белов А.В.)"},
        {number: 16088, operation: "Изменение данных клиента", status: "Закрыта", author: "u11827 (Белов А.В.)"},
        {number: 13177, operation: "Одобрение карты", status: "Закрыта", author: "u11827 (Белов А.В.)"},
        {number: 14291, operation: "Создание депозита", status: "Закрыта", author: "u11827 (Белов А.В.)"},
        {number: 16364, operation: "Открытие карты", status: "Закрыта", author: "u12342 (Гришко Е.И.)"},
        {number: 11413, operation: "Массовый выпуск карты для клиента", status: "Закрыта", author: "u12342 (Гришко Е.И.)"},
        {number: 11322, operation: "Открытие депозита", status: "Закрыта", author: "u12342 (Гришко Е.И.)"},
        {number: 15854, operation: "Создание карточки клиента", status: "Закрыта", author: "u11827 (Белов А.В.)"},
        {number: 15234, operation: "Изменение данных клиента", status: "Закрыта", author: "u11827 (Белов А.В.)"}
    ];

    function DrawChartDataKPI() {
        var chart = am4core.create("data_KPI_chart", am4charts.XYChart);

        // Add data
        chart.data = data;

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 1;
        valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
        valueAxis.renderer.grid.template.strokeWidth = 2;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
        series.name = "Data";
    }

    var Axis=createClass({
        propTypes: {
            h:PropTypes.number,
            axis:PropTypes.func,
            axisType:PropTypes.oneOf(['x','y'])
    
        },
    
        componentDidUpdate: function () { this.renderAxis(); },
        componentDidMount: function () { this.renderAxis(); },
        renderAxis: function () {
            var node = ReactDOM.findDOMNode(this);
            d3.select(node).call(this.props.axis);
    
        },
        render: function () {
    
            var translate = "translate(0,"+(this.props.h)+")";
    
            return (
                <g className="axis" transform={this.props.axisType=='x'?translate:""} >
                </g>
            );
        }
    
    });
    
    var Grid=createClass({
        propTypes: {
            h:PropTypes.number,
            grid:PropTypes.func,
            gridType:PropTypes.oneOf(['x','y'])
        },
    
        componentDidUpdate: function () { this.renderGrid(); },
        componentDidMount: function () { this.renderGrid(); },
        renderGrid: function () {
            var node = ReactDOM.findDOMNode(this);
            d3.select(node).call(this.props.grid);
    
        },
        render: function () {
            var translate = "translate(0,"+(this.props.h)+")";
            return (
                <g className="y-grid" transform={this.props.gridType=='x'?translate:""}>
                </g>
            );
        }
    
    });
    
    var Dots=createClass({
        propTypes: {
            data:PropTypes.array,
            x:PropTypes.func,
            y:PropTypes.func
    
        },
        render:function(){
    
            var _self=this;
    
            //remove last & first point
            var data=this.props.data.splice(1);
            data.pop();
    
            var circles=data.map(function(d,i){
    
                return (<circle className="dot" r="7" cx={_self.props.x(d.date)} 
                          cy= {_self.props.y(d.count)} fill="#7dc7f4"
                           stroke="#3f5175" strokeWidth="5px" key={i} />);
            });
    
            return(
                <g>
                    {circles}
                </g>
            );
        }
    });
    
    
    var LineChart=createClass({
    
        propTypes: {
            width:PropTypes.number,
            height:PropTypes.number,
            chartId:PropTypes.string
        },
    
        getDefaultProps: function() {
            return {
                width: 600,
                height: 300,
                chartId: 'v1_chart'
            };
        },
        getInitialState:function(){
            return {
                width:this.props.width
            };
        },
        render:function(){
            var data=[
                {day:'02-11-2016',count:180},
                {day:'02-12-2016',count:250},
                {day:'02-13-2016',count:150},
                {day:'02-14-2016',count:496},
                {day:'02-15-2016',count:140},
                {day:'02-16-2016',count:380},
                {day:'02-17-2016',count:100},
                {day:'02-18-2016',count:150}
            ];
    
            var margin = {top: 5, right: 50, bottom: 20, left: 50},
                w = this.state.width - (margin.left + margin.right),
                h = this.props.height - (margin.top + margin.bottom);
    
            var parseDate = d3.time.format("%m-%d-%Y").parse;
    
            data.forEach(function (d) {
                d.date = parseDate(d.day);
            });
    
            var x = d3.time.scale()
                .domain(d3.extent(data, function (d) {
                    return d.date;
                }))
                .rangeRound([0, w]);
    
            var y = d3.scale.linear()
                .domain([0,d3.max(data,function(d){
                    return d.count+100;
                })])
                .range([h, 0]);
          
          var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(5);
    
           var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .tickValues(data.map(function(d,i){
                    if(i>0)
                        return d.date;
                }).splice(1))
                .ticks(4);
    
            var yGrid = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(5)
                .tickSize(-w, 0, 0)
                .tickFormat("");
            
            var line = d3.svg.line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.count);
                }).interpolate('cardinal');
    
    
            var transform='translate(' + margin.left + ',' + margin.top + ')';
    
            return (
                <div>
                    <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
    
                        <g transform={transform}>
                            <Grid h={h} grid={yGrid} gridType="y"/>
                            <Axis h={h} axis={yAxis} axisType="y" />
                            <Axis h={h} axis={xAxis} axisType="x"/>
                            <path className="line shadow" d={line(data)} strokeLinecap="round"/>
                            <Dots data={data} x={x} y={y}/>
                        </g>
                    </svg>
                </div>
            );
        }
    });

    useEffect(() => {
        DrawChartDataKPI()
    }, [])

    return (
        <div className="container">
            <div className="dataKPI">
                <div className="headers">
                    <div className="textData block">
                        <h1>Дневной KPI</h1>
                        <p>Данные на момент 10:15 28.06.21</p>
                    </div>
                    <div className="buttonsData block">
                        <a href="#">
                            <img src={Resize} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Download} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Settings} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Close} width={16} height={16}/>
                        </a>
                    </div>
                </div>
                <div className="data_KPI_chart">
                </div>
                <ul className="data_KPI_list">
                    <li>
                        <h4>Заявка</h4>
                        <h4>Услуга</h4>
                    </li>
                    {data.map((d) =>
                        <li>
                            <p>{d.value}</p>
                            <p>{d.category}</p>
                        </li>
                    )}
                </ul>
            </div>
            <div className="salesPerDay">
                <div className="headers">
                    <div className="textData block">
                        <h1>Продажи за день</h1>
                        <p>Данные на момент 8:28 28.06.21</p>
                    </div>
                    <div className="buttonsData block">
                        <a href="#">
                            <img src={Resize} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Settings} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Close} width={16} height={16}/>
                        </a>
                    </div>
                </div>
                <div className="sales_per_day_bullets_chart">
                    <LineChart />
                </div>
            </div>
            <div className="currentTasks">
                <div className="headers">
                    <div className="textData block">
                        <h1>Текущие задачи</h1>
                        <p>Данные на момент 9:20 28.06.21</p>
                    </div>
                    <div className="buttonsData block">
                        <a href="#">
                            <img src={Resize} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Settings} width={16} height={16}/>
                        </a>
                        <a href="#">
                            <img src={Close} width={16} height={16}/>
                        </a>
                    </div>
                </div>
                <table className="currentTasks_list">
                    <tr>
                        <th>Номер</th>
                        <th>Что сделать</th>
                        <th></th>
                        <th>Статус</th>
                        <th>Автор</th>
                    </tr>
                    {current_tasks.map((t) =>
                        <tr>
                            <td>{t.number}</td>
                            <td>{t.operation}</td>
                            <a href="#"><img src={Link} width={16} height={16}/></a>
                            <td>{t.status}</td>
                            <td>{t.author}</td>                        
                        </tr>
                    )}
                </table>
            </div>
        </div>
    )
}

export default Dashboard;
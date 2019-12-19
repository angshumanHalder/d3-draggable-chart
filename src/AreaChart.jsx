import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Dots from './Dots';
import ToolTip from './ToolTip';
import Grid from './Grid';
import Axis from './Axis';
import Gradient from './Gradient';
import $ from 'jquery';
import DragLine from './DragLine';

class AreaChart extends Component {

  state = {
    tooltip: { display: false, data: { key: '', value: '' } },
    width: 500,
  };

  componentWillMount() {
    $(window).on('resize', (e) => {
      this.updateSize()
    });

    this.setState({ width: this.props.width });
  }

  componentDidMount() {
    this.updateSize();
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  createChart = (_self) => {
    this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
    this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);
        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.props.data, function (d) {
                return d[_self.props.xData];
            }))
            .rangeRound([0, this.w]);

        this.yScale = d3.scaleLinear()
            .domain([0,d3.max(this.props.data,function(d){
                return d[_self.props.yData]+_self.props.yMaxBuffer;
            })])
            .range([this.h, 0]);
            console.log('asdfasdf', this.props.interpolations)

            this.area = d3.area()
            .x(function (d) {
              console.log('adfa',_self.props.xData)
                return d[_self.props.xData];
            })
            .y0(this.h)
            .y1(function (d) {
                return d[_self.props.yData];
            }).curve(d3.curveLinear);



        var interpolations = [
            "linear",
            "step-before",
            "step-after",
            "basis",
            "basis-closed",
            "cardinal",
            "cardinal-closed"];
          console.log('asdfasndf', this.props.interpolations)
        this.line = d3.line()
            .x(function (d) {
                return d[_self.props.xData];
            })
            .y(function (d) {
                return d[_self.props.yData];
            }).curve(d3.curveLinear);


        this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
  }

  updateSize = () => {
    let node = ReactDOM.findDOMNode(this);
    console.log('asdfasd', node.width)
    let parentWidth = $(node).width();

    if(parentWidth < this.props.width){
        this.setState({width:parentWidth-20});
    }else{
        this.setState({width:this.props.width});
    }
  }

  createElements = (element, i) => {
    var object;
    console.log('element', element)
        switch(element.type){
            case 'dots':
                object=(<Dots x={this.xScale} y={this.yScale} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}
                    {...this.props} {...element.props} key={i}/>);
                break;

            case 'tooltip':
                object=<ToolTip tooltip={this.state.tooltip} key={i} {...this.props} {...element.props}/>;
                break;
            case 'dragLine':
              object = <DragLine width={this.props.width} height={this.props.height} margin={this.props.margin} />
              break;
            case 'xGrid':
                object=<Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
                break;

            case 'yGrid':
                object=<Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
                break;

            case 'xAxis':
                object=<Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
                break;

            case 'yAxis':
                object=<Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
                break;

            case 'area':
              console.log('adskfakshfd', this.area)
                object=<path className={element.props.className} d={this.area(this.props.data)} key={i} fill={element.props.fill}/>;
                break;
            case 'path':
                object=<path className={element.props.className} d={this.line(this.props.data)} strokeLinecap={element.props.strokeLinecap} key={i}/>;
                break;
              default:
                object = undefined;
        }
        return object;
  }

  createDefs = (element, i) => {
    let object;
    switch(element.type){
        case 'gradient':
            object=(<Gradient id={element.props.id} color1={element.props.color1} color2={element.props.color2}/>);
            break;
            default:
              object = undefined;
    }
    return object;
  }

  showToolTip = (e) => {
    e.target.setAttribute('fill', '#FFFFFF');

        this.setState({tooltip:{
            display:true,
            data: {
                key:e.target.getAttribute('data-key'),
                value:e.target.getAttribute('data-value')
                },
            pos:{
                x:e.target.getAttribute('cx'),
                y:e.target.getAttribute('cy')
            }

            }
        });
  }

  hideToolTip = (e) => {
    e.target.setAttribute('fill', '#7dc7f4');
        this.setState({tooltip:{ display:false,data:{key:'',value:''}}});
  }

  render() {
    this.createChart(this);

        var elements;
        var defs;
        var _self=this;

        if(this.props.children!== null) {
            if (Array.isArray(this.props.children)) {
                elements=this.props.children.map(function(element,i){

                    if(element.type !== "defs")
                        return _self.createElements(element,i)
                });

                for(var i=0;i<this.props.children.length;++i){
                    if(this.props.children[i].type==="defs"){

                        var config=this.props.children[i].props.children;
                        if(config!=null){
                            if(Array.isArray(config)){
                                defs=config.map(function(elem,i){
                                    return this.createDefs(elem,i)
                                });
                            }else{
                                defs=this.createDefs(config,0);
                            }
                        }

                    }
                }



            }else{
                elements=this.createElements(this.props.children,0)
            }
        }

        return (
            <div>
                <svg id={this.props.id} width={this.state.width} height={this.props.height}>
                    <foreignObject>
                      <svg width={this.state.width} height={this.props.height}></svg>
                    </foreignObject>
                    {defs}
                    <g transform={this.transform}>
                        {elements}

                    </g>

                </svg>


            </div>
        );
  }
}

AreaChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string,
  interpolations: PropTypes.string,
  data: PropTypes.array.isRequired,
  xData: PropTypes.string.isRequired,
  yData: PropTypes.string.isRequired,
  margin: PropTypes.object,
  yMaxBuffer: PropTypes.number,
  fill: PropTypes.string
}

AreaChart.defaultProps = {
  width: 800,
  height: 300,
  id: 'v1_chart',
  interpolations:'linear',
  margin:{
      top: 5, right: 5, bottom: 5, left: 5
  },
  yMaxBuffer:10
}

export default AreaChart

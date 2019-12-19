import React from 'react'
import * as moment from 'moment';
import * as d3 from 'd3';
import Panel from './Panel';
import PanelHeader from './PanelHeader';
import AreaChart from './AreaChart';

const MainContainer = () => {
  let data=[];
        let parseDate = d3.timeParse("%m-%d-%Y");

        for(let i=0;i<15;++i){

            let d={day:moment().subtract(i, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 80) + 50)};
            d.date = parseDate(d.day);
            data[i]=d;
        }
      
        let margin={
            top: 20, right: 30, bottom: 20, left: 50
        };
  return (
    <div className="row">
    <div className="col-md-12 custom_padding" >
        <Panel>
            <PanelHeader title="Traffic Trend">
               
            </PanelHeader>
            <AreaChart data={data} xData="date" yData="count" margin={margin}
                             yMaxBuffer={10} id="line-chart" width={1500}>
                <defs>
                    <gradient color1="#fff" color2="#53c79f" id="area"/>
                </defs>
                {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
                <yGrid orient="left" className="y-grid" ticks={5}/>
                <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                <yAxis orient="left" className="axis" ticks={5}/>
                <dragLine className="drag-line" />
                <area className="area" fill="url(#area)" alt=""/>
                <path className="line shadow" strokeLinecap="round"/>
                <dots r="5" format="%b %e" removeFirstAndLast={false}/>
                <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
            </AreaChart>
        </Panel>
    </div>
</div>
  )
}

export default MainContainer

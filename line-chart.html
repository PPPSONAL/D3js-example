import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { nest } from 'd3-collection';
import * as moment from 'moment-timezone';
export interface SimpleDataModel {
  xVal: string;
  yVal: string;
  type: string;
}
@Component({
  selector: 'ngx-multi-line-chart',
  template: ''
})
export class MultiLineChartComponent implements OnInit {
  @Input() private data: SimpleDataModel[];

  // var margin = {top: 10, right: 30, bottom: 30, left: 60},
  // width = 460 - margin.left - margin.right,
  // height = 400 - margin.top - margin.bottom;
  private targetId = 'multi-line-chart'
  private targetElem = document.getElementById(this.targetId)
  private svg;
  private margin = { top: 10, right: 30, bottom: 30, left: 60 }
  private width = 500 - this.margin.left - this.margin.right;
  private height = 420 - this.margin.top - this.margin.bottom;

  // private width = this.targetElem.parentElement.clientWidth - this.margin.left - this.margin.right;
  // private height = this.targetElem.parentElement.clientHeight - this.margin.top - this.margin.bottom;
  type = '';
  sumstat: any;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChange = changes.data;
    if (!dataChange.firstChange) {
      this.data = dataChange?.currentValue ? dataChange?.currentValue : this.data;
      if (typeof (this.data) != 'undefined') {
        this.revoveOldContent()
        let data = nest()
          .key(function (d) { return d.type; })
          .entries(this.data);

        this.drawLineChart(data)
      }
    }
  }

  revoveOldContent() {
    const myNode = document.getElementById(this.targetId);
    myNode.innerHTML = '';
  }

  drawLineChart(data: any) {
    if(typeof(data[0]) != 'undefined' ){
    let tooltip = d3.select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("font-size", "10px")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");


    let domainData = typeof (data[0].values) != 'undefined' ? data[0].values : typeof (data[0].values) as any
    var width = 500;
    var height = 350;
    var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 4;
    var circleRadiusHover = 8;
      var useNewFormat = false;  


      /* Format Data */
      var parseDate = d3.timeParse("%b %Y");
      if (parseDate(data[0].values[0].xVal) == undefined) { 
        parseDate = d3.timeParse("%d %b");
        useNewFormat = true;
      }
    data.forEach((item: any) => {
      item.values.forEach((d: any) => {
        d.xVal = parseDate(d.xVal);
        d.yVal = +d.yVal;
      });
    });
      var yAxisMaxValue = Math.max(parseInt(d3.max(data[1].values, (d: any) => d.yVal)), parseInt(d3.max(data[0].values, (d: any) => d.yVal)));
    /* Scale */
    var xScale = d3.scaleTime()
      .domain(d3.extent(domainData, (d: any) => d.xVal) as any)
      .range([0, width - margin])

    var yScale = d3.scaleLinear()
      // .domain([0, d3.max(domainData, (d: any) => d.yVal) as any])
      .domain([0, yAxisMaxValue])
        .range([height - margin, 0]);
      
      var yAxisTicks = createTicksY(yScale.domain()[0], yScale.domain()[1], 5);
      // var xAxisTicks = createTicksX(xScale.domain()[0], xScale.domain()[1], 5);
      // var xAxisTicks = d3.extent(domainData, (d: any) => d.xVal) as any;

      // function createTicksX(start, stop, count) {
      //   var difference = stop - start;
      //   var steps = difference / (count - 1);
      //   var arr = [start];
      //   for (var i = 1; i < count; i++) {
      //     arr.push(~~(start + steps * i))
      //   }
      //   return arr;
      // }

      function createTicksY(start, stop, count) {
        var difference = stop - start;
        var steps = difference / (count - 1);
        var arr = [start];
        for (var i = 1; i < count; i++) {
          arr.push(~~(start + steps * i))
        }
        return arr;
      }

    var color = ['#FF5A5A', '#0C56DF', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']


    /* Add SVG */
    this.svg = d3.select("figure#" + this.targetId).append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width + margin} ${height + margin + 20}`)
      .append('g')
      .attr("transform", `translate(${margin + 40}, ${margin})`);

    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -60)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Number of Opportunities");

    this.svg.append("text")
      // .attr("transform", "translate(" + (this.width/ 2) + " ," + (this.height - 10) + ")")
      .attr("transform", "translate(" + (width / 2) + " ," + (height) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Month");

    /* Add line into SVG */
    var line = d3.line()
      .x((d: any) => xScale(d.xVal))
      .y((d: any) => yScale(d.yVal));

      
    let lines = this.svg.append('g')
      .attr('class', 'lines');

    lines.selectAll('.line-group')
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .append('path')
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", (d: any, i: number) => color[i])
      .attr("stroke-width", 1.5)
      .attr("d", function (d: any) {
        return d3.line()
          .x((d: any) => xScale(d.xVal))
          .y((d: any) => yScale(d.yVal))
          (d.values)
      });


    /* Add circles in the line */
    lines.selectAll("circle-group")
      .data(data).enter()
      .append("g")
      .style("fill", (d: any, i: number) => color[i])
      .selectAll("circle")
      .data((d: any) => d.values).enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (e: any, d: any) {
        tooltip.html(`${d.type}: ${d.yVal} <br> ${useNewFormat ? 'Date:' + moment(d.xVal).format('DD MMM') : 'Year:' + moment(d.xVal).format('MMM YYYY')}`).style("visibility", "visible");
      })
      .on("mousemove", function () {
        tooltip.style("top", (event["pageY"] - 10) + "px").style("left", (event["pageX"] + 10) + "px");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
      })
      .on("click", function (e: any, d: any) {
        tooltip.html(`${d.type}: ${d.yVal} <br> ${useNewFormat ? 'Date:' + moment(d.xVal).format('DD MMM') : 'Year:' + moment(d.xVal).format('MMM YYYY')}`).style("visibility", "visible");
      })
      .append("circle")
      .attr("cx", (d: any) => xScale(d.xVal))
      .attr("cy", (d: any) => yScale(d.yVal))
      .attr("r", circleRadius)
      .style('opacity', circleOpacity)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });


    /* Add Axis into SVG */
      // var xAxis = d3.axisBottom(xScale).tickSizeInner(0).tickSizeOuter(0).tickValues(xAxisTicks).ticks(3);
      var xAxis 
      if(useNewFormat){
        xAxis = d3.axisBottom(xScale).tickSizeInner(0).tickSizeOuter(0).ticks(d3.timeDay.every(2))
        .tickFormat(d3.timeFormat("%d %b"));
      }else{
        xAxis = d3.axisBottom(xScale).tickSizeInner(0).tickSizeOuter(0).ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b %Y"));
      }
      // var yAxis = d3.axisLeft(yScale).tickSizeInner(0).tickSizeOuter(0).ticks(5);
      var yAxis = d3.axisLeft(yScale).tickSizeInner(0).tickSizeOuter(0).tickValues(yAxisTicks);
      

    this.svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis).selectAll("text").text((d: any) => {
        return useNewFormat ? moment(d).format('DD MMM') : moment(d).format('MMM YY')
      })
      .attr("transform", (d: any) => {
        return "rotate(-45)"
      })
      .style("text-anchor", "end");

    this.svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .append('text')
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000");
    this.svg.selectAll('.x-axis path').attr('stroke', '#ACACAC24');
    this.svg.selectAll('.y-axis path').attr('stroke', '#ACACAC24');
  }
  }
}

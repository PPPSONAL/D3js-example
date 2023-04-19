import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'ngx-progress-bar-chart',
  template: ''
})
export class ProgressBarChartComponent implements OnInit, OnChanges {
  @Input('data') data: any
  @Input('id') id: any
  

  constructor() { }

  ngOnInit() {
    // this.revoveOldContent()
    // this.drawChart(this.data)
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChange = changes.data;
    this.data = dataChange.currentValue;
    const dataChangeID = changes.id;
    this.id = dataChangeID?.currentValue ? dataChangeID?.currentValue : this.id
    if(typeof(this.data) != 'undefined'){
      this.revoveOldContent()
      this.drawChart(this.data)
    }
  }

  revoveOldContent() {
    const myNode = document.getElementById(this.id);
    myNode.innerHTML = '';
  }

  drawChart(data:any){
    if(data.val >= 0){
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

   var svg = d3.select("figure#"+this.id)
		.append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 100 50`)
    .append("g")
    .attr(
      "transform",
      "translate(5,15)"
    );

	// var states = [25, 50, 75, 100],
  //   segmentWidth = 50;
  // let colorRange = []
  // states.forEach((d: any, i:number)=>{
  //     if(segmentWidth <= d){
  //       return colorRange.push(i)
  //     } 
  //   })
   
	// var colorScale = ['#FD4141','#EEB627', '#FF7C43', '#28CE0D'];

	svg.append('rect')
		.attr('class', 'bg-rect')
		.attr('rx', 5)
		.attr('ry', 5)
		.attr('fill', '#fff')
		.attr('height', 15)
		.attr('width', 90)
		.attr('x', 0)
    .on("mouseover", function (e: any) {
      tooltip.html(`${data.text1}(${data.walkins}) vs ${data.text2}(${data.bookings})`).style("visibility", "visible");
    })
    .on("mousemove", function () {
      tooltip.style("top", (event["pageY"] - 10) + "px").style("left", (event["pageX"] + 10) + "px");
    })
    .on("mouseout", function () {
      tooltip.html(``).style("visibility", "hidden");
    })
    .on("click", function (e: any) {
      tooltip.html(`${data.text1}(${data.walkins}) vs ${data.text2}(${data.bookings})`).style("visibility", "visible");
    })
    var progress: any
    if(data.val > 90){
      progress = svg.append('rect')
      .attr('class', 'progress-rect')
      .attr('fill', data.color)
      .attr('height', 15)
      .attr('width', 90)
      .attr('rx', 5)
      .attr('ry', 5)
      .on("mouseover", function (e: any) {
        tooltip.html(`${data.text1}(${data.walkins}) vs ${data.text2}(${data.bookings})`).style("visibility", "visible");
      })
      .on("mousemove", function () {
        tooltip.style("top", (event["pageY"] - 10) + "px").style("left", (event["pageX"] + 10) + "px");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
      })
      .on("click", function (e: any) {
        tooltip.html(`${data.text1}(${data.walkins}) vs ${data.text2}(${data.bookings})`).style("visibility", "visible");
      })
    }else{
      progress = svg.append('path')
      .attr('class', 'progress-rect')
      .attr('fill', data.color)
      .attr('height', 15)
      .attr('width', 0)
      .attr('d',()=>{
        let val = data.val > 90 ? 90 : data.val;
        if(val >= 3){
          return "M" + 0 + "," + 0
          + "h" + (val - 5)
          + "a" + 5 + "," + 5 + " 0 0 1 " + 5 + "," + 5
          + "v" + (15 - 2 * 5)
          + "a" + 5 + "," + 5 + " 0 0 1 " + -5 + "," + 5
          + "h" + (5 - val)
          + "z";
        }else if(val < 3){
          return "M" + 0 + "," + 0
          + "h" + (val - 0)
          + "a" + 0 + "," + 0 + " 0 0 1 " + 0 + "," + 0
          + "v" + (10 - 2 * 0)
          + "a" + 0 + "," + 0 + " 0 0 1 " + -0 + "," + 0
          + "h" + (0 - val)
          + "z";
        }
      })
      .attr("transform",(d: any)=>{
        let val = data.val > 90 ? 90 : data.val;
         return val >= 3? "translate("+val+", 15) rotate(180)" : "translate("+val+", 13) rotate(180)"
      })
      .on("mouseover", function (e: any) {
        tooltip.html(`${data.text1}(${data.walkins}) vs ${data.text2}(${data.bookings})`).style("visibility", "visible");
      })
      .on("mousemove", function () {
        tooltip.style("top", (event["pageY"] - 10) + "px").style("left", (event["pageX"] + 10) + "px");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
      })
      .on("click", function (e: any) {
        tooltip.html(`${data.text1}(${data.walkins}) vs ${data.text2}(${data.bookings})`).style("visibility", "visible");
      })
      .attr('x', 0);
    }




    svg.append('text')
    .attr("x", 16)
        .attr("y", 8)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .attr("font-size", "4px")
        .attr("font-weight", "400")
        .text(()=>{
          return data.val+'% ' + data.title
        }) 
    // svg.append('text')
    // .attr("x", data.title_x)
    //     .attr("y", 5)
    //     .attr("dy", "1.65em")
    //     .style("text-anchor", "start")
    //     .attr("font-size", "4px")
    //     .attr("font-weight", "400")
    //     .text(()=>{
    //       return data.title
    //     })            

  progress.transition()
          .duration(1000)
          .attr('width', () => { 
            return data.val > 90 ? 90 : data.val;
          });        
      }
  }

}

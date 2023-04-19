import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'ngx-gauge-chart',
  template: ''
})
export class GaugeChartComponent implements OnInit, OnChanges {
  @Input() data: any
  @Input() target: any
  gaugemap: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChange = changes.data;
    this.data = dataChange.currentValue
    this.revoveOldContent();
    if (isNaN(this.data)) { 
      this.data = 0;
    }
    this.draw(this.data);
  }

  revoveOldContent() {
    const myNode = document.getElementById(this.target);
    myNode.innerHTML = '';
  }

  draw(data: any) {
    var self = this;
    var gauge = function (container, configuration) {
      var config = {
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 5,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.6,

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 4,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHsl('red', 'green'),
        color:['#FF5A5A','#EEB627','#28CE0D','#28CE0D']
      };
      var range = undefined;
      var r = undefined;
      var pointerHeadLength = undefined;
      var value = 0;

      var svg = undefined;
      var arc = undefined;
      var scale = undefined;
      var ticks = undefined;
      var tickData = undefined;
      var pointer = undefined;

      var donut = d3.pie();

      function deg2rad(deg) {
        return (deg * Math.PI) / 180;
      }

      function newAngle(d) {
        var ratio = scale(d);
        var newAngle = config.minAngle + ratio * range;
        return newAngle;
      }

      var configure = (configuration) => {
        var prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3
          .scaleLinear()
          // .range([0, 100])
          .domain([0, 100])
        // ticks = scale.ticks(config.majorTicks);
        ticks = [0,25,50,75,100];
        tickData = d3.range(config.majorTicks).map(function () {
          return 1 / config.majorTicks;
        });

        arc = d3
          .arc()
          .innerRadius(45) // r - config.ringWidth - config.ringInset
          .outerRadius(r - config.ringInset)
          .startAngle(function (d: any, i: number) {
            var ratio = d * i;
            return deg2rad(config.minAngle + ratio * range);
          })
          .endAngle(function (d: any, i: number) {
            var ratio = d * (i + 1);
            return deg2rad(config.minAngle + ratio * range);
          });
      }
      self.gaugemap.configure = configure;

      function centerTranslation() {
        let rad = r + 10 
        return 'translate(' + rad  + ',' + rad + ')';
      }

      function isRendered() {
        return svg !== undefined;
      }
      self.gaugemap.isRendered = isRendered;

      function render(newValue) {
        svg = d3
          .select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        var centerTx = centerTranslation();
        var arcs = svg
          .append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs
          .selectAll('path')
          .data(tickData)
          .enter()
          .append('path')
          .attr('fill', function (d, i) {
            return config.color[i];
          })
          .attr('d', arc);

        var lg = svg
          .append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
        lg.selectAll('text')
          .data(ticks)
          .enter()
          .append('text')
          .attr('transform', function (d) {
            var ratio = scale(d);
            var newAngle = config.minAngle + ratio * range;
            return ('rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')');
          })
          .text((d: any) => {
            return d + "%";
          })
          .attr("text-anchor", "middle")  
          .style("font-size", "12px")
          .style('fill','#9c9fa2');

        var lineData = [
          [config.pointerWidth / 2, 0],
          [0, -pointerHeadLength],
          [-(config.pointerWidth / 2), 0],
          [0, config.pointerTailLength],
          [config.pointerWidth / 2, 0],
        ];
        var pointerLine = d3.line().curve(d3.curveLinear);
        var pg = svg
          .append('g')
          .data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg
          .append('path')
          .attr('d', pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
          .attr('transform', 'rotate(' + config.minAngle + ')');

        update(newValue === undefined ? 0 : newValue);
      }
      self.gaugemap.render = render;
      function update(newValue, newConfiguration?) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        var ratio = scale(newValue);
        var newAngle = config.minAngle + ratio * range;
        pointer
          .transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      self.gaugemap.update = update;

      configure(configuration);

      return self.gaugemap;
    };

    var powerGauge = gauge('#' + this.target, {
      size: 180,
      clipWidth: 200,
      clipHeight: 150,
      ringWidth: 60,
      maxValue: 100,
      transitionMs: 4000,
    });
    powerGauge.render(data);
  }

}

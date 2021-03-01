import {Component, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {TemperatureSample} from '../temperature-sensor.service';
import {NewTemperatureSamplesEventService} from '../new-temperature-samples-event.service';
import {NewTemperatureSamplesEvent} from '../new-temperature-samples-event';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

    @Input() public data: TemperatureSample[];

    private width = 700;
    private height = 700;
    private margin = 50;

    public svg;
    public svgInner;
    public yScale;
    public xScale;
    public xAxis;
    public yAxis;
    public lineGroup;

    constructor( public chartElem: ElementRef,
                 private newTemperatureSamplesEventService: NewTemperatureSamplesEventService ) {
    }

    ngOnInit(): void {
        this.newTemperatureSamplesEventService.getExchange().subscribe( event => this.newTemperatureSamplesEventHandler( event ));
        this.initializeChart();
        this.drawChart();
        this.drawLine();
        window.addEventListener('resize', () => this.drawChart());
    }

    public newTemperatureSamplesEventHandler( event: NewTemperatureSamplesEvent ): void {
        this.data = event.samples;
        console.log(this.data);
        this.drawLine();
    }

    private initializeChart(): void {
        this.svg = d3
            .select(this.chartElem.nativeElement)
            .select('.linechart')
            .append('svg')
            .attr('height', this.height);

        this.svgInner = this.svg
            .append('g')
            .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

        this.yScale = d3
            .scaleLinear()
            .domain([d3.max(this.data, d => d.value) + 1, d3.min(this.data, d => d.value) - 1])
            .range([0, this.height - 2 * this.margin]);

        this.yAxis = this.svgInner
            .append('g')
            .attr('id', 'y-axis')
            .style('transform', 'translate(' + this.margin + 'px,  0)');

        this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.timestamp)));

        this.xAxis = this.svgInner
            .append('g')
            .attr('id', 'x-axis')
            .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

        this.lineGroup = this.svgInner
            .append('g')
            .append('path')
            .attr('id', 'line')
            .style('fill', 'none')
            .style('stroke', 'red')
            .style('stroke-width', '2px');
    }

    private drawChart(): void {
        this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
        this.svg.attr('width', this.width);

        this.xScale.range([this.margin, this.width - 2 * this.margin]);

        const xAxis = d3
            .axisBottom(this.xScale)
            .ticks( 0 )
            // .tickFormat(d3.timeFormat('%m / %Y'))
        ;

        this.xAxis.call(xAxis);

        const yAxis = d3
            .axisLeft(this.yScale);

        this.yAxis.call(yAxis);

        this.drawLine();
    }

    drawLine(): void {

        const line = d3
            .line()
            .x(d => d[0])
            .y(d => d[1])
            .curve( d3.curveLinear ); // was d3.curveMonotoneX, see http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8

        const points: [number, number][] = this.data.map(d => [
            this.xScale(new Date(d.timestamp)),
            this.yScale(d.value),
        ]);

        this.lineGroup.attr('d', line(points));
    }
}

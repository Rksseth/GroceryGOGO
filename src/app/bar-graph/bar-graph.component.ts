import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white'
      } 
    },
    scales: {
      yAxes: [{
          ticks: {
              fontColor: "white"
          }
      }],
      xAxes: [{
          ticks: {
              fontColor: "white"
          }
      }]
  }
  };
  public barChartLabels = ['Chicken', 'Milk', 'Bread', 'Apples'];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [
    {data: [10, 7, 5, 5, 4, 2, 1], label: 'last month'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

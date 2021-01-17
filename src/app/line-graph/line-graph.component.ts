import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {

  @Input() lineChartData = [
    { data: [1, 0.5, 0, 1], label: 'Milk' },
    { data: [null, null, null, 1, 0.5, 0], label: 'Milk Estimated', borderDash: [10,5] }
  ];
  public lineChartLabels = ['Jan 8', 'Jan 11', 'Jan 14', 'Jan 17', 'Jan 20', 'Jan 23'];
  public lineChartOptions = {
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
  public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  constructor() { }

  ngOnInit(): void {
  }

}

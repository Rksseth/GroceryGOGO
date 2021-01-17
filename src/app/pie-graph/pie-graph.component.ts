import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from '../../models/Purchase';


@Component({
  selector: 'pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit {

  @Input() purchase: Purchase

  chartData = [];
  chartLabels = [];
  chartType = 'pie';
  pieChartOptions = {
    legend: {
      labels: {
        fontColor: 'white'
      } 
    }
  }

  constructor() { }

  ngOnInit(): void {
    let classifications = {

    }
    for (let item of this.purchase.list) {
      let name = this.classification(item);

      if (name in classifications) {
        classifications[name] += 1
      } else {
        classifications[name] = 1
      }
    }
    this.chartLabels = Object.keys(classifications);
    this.chartData = Object.values(classifications);
  }

  classification(item_name: string): string {
    let produce: Array<string> = ['apple', 'lettuce', 'orange', 'cucumber', 'carrot', 'banana', 'eggs'];
    let meat: Array<string> = ['chicken', 'fish', 'steak','sausage', 'ham', 'tuna'];
    let condiments: Array<string> = ['ketchup', 'mayonaise'];
    let beverages: Array<string> = ['beer', 'wine', 'orange juice', 'apple juice'];
    let grain: Array<string> = ['rice', 'pasta', 'noodle', 'bread', 'mini wheats'];
    let household: Array<string> = ['toilet paper', 'toothpaste', 'toothbrush'];
    let dairy: Array<string> = ['2% milk', 'cheese'];
    let snacks: Array<string> = ['chips', 'cookies','candy'];

    if (new RegExp(produce.join("|")).test(item_name)) {
      return "produce";
    } else if (new RegExp(condiments.join("|")).test(item_name)){
      return "condiments";
    } else if (new RegExp(grain.join("|")).test(item_name)){
      return "grain";
    } else if (new RegExp(meat.join("|")).test(item_name)){
      return "meat";
    } else if (new RegExp(beverages.join("|")).test(item_name)) {
      return "beverage";
    } else if (new RegExp(household.join("|")).test(item_name)) {
      return "household";
    } else if (new RegExp(dairy.join("|")).test(item_name)) {
      return "dairy";
    } else if (new RegExp(snacks.join("|")).test(item_name)) {
      return "snacks";
    } else {
      return "unkown";
    }
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Purchase } from '../../models/Purchase';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  list: Array<Purchase> = [];

  topLeftDate: Date;
  bottomLeftDate: number;
  topRightItem: number = 0;
  bottomRightMonth: string = "last month";

  topRightItems = ['bread', 'milk', 'cereal', 'chicken', 'pasta']
  topRightList = [
    [
      { data: [1, 0.5, 0, 1], label: 'Milk' },
      { data: [null, null, null, 1, 0.5, 0], label: 'Estimated 6 days till you need Milk', borderDash: [10,5] }
    ],
    [
      { data: [1, 0.8, 0.6, 0.4], label: 'Bread' },
      { data: [null, null, null, 0.4, 0.2, 0], label: 'Estimated 6 days till you need Bread', borderDash: [10,5] }
    ],
    [
      { data: [0.4, 0.3, 0.2], label: 'Cereal' },
      { data: [null, null, 0.2, 0.1, 0], label: 'Estimated 3 days till you need Cereal', borderDash: [10,5] }
    ],
    [
      { label: 'Chicken' }
    ],
    [
      { label: 'Pasta' }
    ]
  ]

  constructor() { }

  ngOnInit(): void {
    // Initalize purchases
    let current = new Date();
    this.topLeftDate = current;

    let prev2Weeks = new Date()
    prev2Weeks.setDate(prev2Weeks.getDate() - 14)

    let prevWeek = new Date()
    prevWeek.setDate(prevWeek.getDate() - 7)

    this.bottomLeftDate = 0;

    let purchase1: Purchase = {
      date: prev2Weeks,
      list: [
        'apple',
        'orange',
        'bread',
        'ham',
        'cheese'
      ]
    }

    let purchase2: Purchase = {
      date: current,
      list: [
        'mini wheats',
        '2% milk',
        'tuna',
        'bread',
        'lettuce',
        'mayonaise'
      ]
    }

    let purchase3: Purchase = {
      date: prevWeek,
      list: [
        'toilet paper', 'toothpaste', 'toothbrush'
      ]
    }
    this.list.push(purchase1, purchase3, purchase2)
  }
}

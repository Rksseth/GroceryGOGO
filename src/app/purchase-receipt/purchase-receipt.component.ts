import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from '../../models/Purchase';

import * as receipt from 'receipt';


@Component({
  selector: 'purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.scss']
})
export class PurchaseReceiptComponent implements OnInit {

  @Input() case: number = 0;

  items = [];

  items2: Array<Object> = [
    {
      name: "Milk",
      quantity: 4,
      price: 20.99
    },
    {
      name: "Apples",
      quantity: 10,
      price: 14.99
    },
    {
      name: "Rice",
      quantity: 2,
      price: 9.99
    },
    {
      name: "Chicken",
      quantity: 2,
      price: 20.99
    },
    {
      name: "Noodles",
      quantity: 3,
      price: 6.99
    }
  ]

  items3: Array<Object> = [
    {
      name: "2% milk",
      quantity: 1,
      price: 5.99
    },
    {
      name: "mini wheats",
      quantity: 2,
      price: 13.99
    },
    {
      name: "tuna",
      quantity: 5,
      price: 12.99
    },
    {
      name: "lettuce",
      quantity: 1,
      price: 2.99
    },
    {
      name: "mayonaise",
      quantity: 1,
      price: 4.99
    }
  ]

  total: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    console.log(this.case)
    if (this.case != 0) {
      this.items = this.items3;
    } else {
      this.items = this.items2
    }
    this.total = 0;
    for (let item of this.items) {
      this.total += item['price'];
    }

    this.total = Math.round(this.total*100)/100;
  }

}

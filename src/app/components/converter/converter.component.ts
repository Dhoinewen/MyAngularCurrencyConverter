import {Component, Input, OnInit} from '@angular/core';
import {ICurrencies} from "../../models/currency";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  @Input() currencies: ICurrencies[]
  errorText: string
  exchangeFromTo = true
  fromCurrency: ICurrencies
  toCurrency: ICurrencies
  fromSelectControl: FormControl
  fromInputControl: FormControl
  toSelectControl: FormControl
  toInputControl: FormControl

  ngOnInit(): void {
    this.fromSelectControl = new FormControl()
    this.toSelectControl = new FormControl()
    this.fromInputControl = new FormControl(100)
    this.toInputControl = new FormControl(1)


    this.fromSelectControl.valueChanges.subscribe((value) => {
      this.fromCurrency = value
      this.toInputControl.setValue((this.fromInputControl.value * this.calculateExchangeRate()).toFixed(2))
    })

    this.toSelectControl.valueChanges.subscribe((value) => {
      this.toCurrency = value
      this.fromInputControl.setValue((this.toInputControl.value * this.calculateExchangeRate()).toFixed(2))
    })

    this.fromInputControl.valueChanges.subscribe((value) => {
      if (this.exchangeFromTo) {
        this.toInputControl.setValue((value * this.calculateExchangeRate()).toFixed(2))
      }

    })
    this.toInputControl.valueChanges.subscribe((value) => {
      if (!this.exchangeFromTo) {
        this.fromInputControl.setValue((value * this.calculateExchangeRate()).toFixed(2))
      }
    })
  }

  testFunc(value: boolean): void {
    this.exchangeFromTo = value
  }


  calculateExchangeRate(): number {
    let exchangeRate: number = 0
    if (this.fromCurrency.cc == 'UAH' && this.toCurrency.cc == 'UAH') {
      exchangeRate = 1
      return exchangeRate
    }
    if (this.fromCurrency.cc == 'UAH')  {
      if (this.exchangeFromTo) {
        exchangeRate = 1 / this.toCurrency.rate
      } else {
        exchangeRate =  this.toCurrency.rate
      }
      return exchangeRate
    }
    if (this.toCurrency.cc == 'UAH') {
      if (this.exchangeFromTo) {
        exchangeRate =  this.fromCurrency.rate
      } else {
        exchangeRate = 1 / this.fromCurrency.rate
      }
      return exchangeRate
    }
    if (this.exchangeFromTo) {
      exchangeRate = this.fromCurrency.rate / this.toCurrency.rate
    } else {
      exchangeRate = this.toCurrency.rate / this.fromCurrency.rate
    }
    return exchangeRate
  }


}

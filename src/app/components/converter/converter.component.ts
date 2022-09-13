import {Component, Input, OnInit} from '@angular/core';
import {ICurrencies} from "../../models/currency";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  @Input() currencies: ICurrencies[]
  exchangeFromTo = true
  fromCurrency: ICurrencies
  toCurrency: ICurrencies
  fromFormControl: FormGroup
  toFormControl: FormGroup


  ngOnInit(): void {
    this.newFormsControl()
    this.formChangesSubscribe()
  }

  newFormsControl(): void {
    this.fromFormControl = new FormGroup({
      SelectControl: new FormControl(),
      InputControl: new FormControl(1)
    })

    this.toFormControl = new FormGroup({
      SelectControl: new FormControl(),
      InputControl: new FormControl(100)
    })
  }

  formChangesSubscribe(): void {

    this.fromFormControl.valueChanges.subscribe((value) => {
      this.fromCurrency = value.SelectControl
      if (this.exchangeFromTo) this.calculateResultValue(value.InputControl, this.toFormControl)
    })

    this.toFormControl.valueChanges.subscribe((value) => {
      this.toCurrency = value.SelectControl
      if (!this.exchangeFromTo) this.calculateResultValue(value.InputControl, this.fromFormControl)
    })
  }

  calculateResultValue(value: number, form: FormGroup): void {
    form.patchValue({InputControl: (value * this.calculateExchangeRate()).toFixed(2)})
  }

  changeFromToValue(value: boolean): void {
    this.exchangeFromTo = value
  }

  calculateExchangeRate(): number {
    let exchangeRate: number
    this.exchangeFromTo ? exchangeRate = this.fromCurrency.rate / this.toCurrency.rate
      : exchangeRate = this.toCurrency.rate / this.fromCurrency.rate
    return exchangeRate
  }

}

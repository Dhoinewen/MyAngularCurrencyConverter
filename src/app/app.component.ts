import {Component, OnInit} from '@angular/core';
import {ICurrencies} from "./models/currency";
import {CurrenciesService} from "./services/currencies.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;
  currencies: ICurrencies[] = [];
  USD: ICurrencies;
  EUR: ICurrencies;

  constructor(private currenciesService: CurrenciesService) { }

  ngOnInit(): void {
    this.loading = true
    this.getData()
  }

  getData(): void {
    this.currenciesService.getAll().subscribe(currencies => {
      this.currencies = currencies
      let usd = this.currencies.find(item => item.cc == 'USD')
      let eur = this.currencies.find(item => item.cc == 'EUR')
      if (usd != undefined) {
        this.USD = usd
      }
      if (eur != undefined) {
        this.EUR = eur
      }
      this.loading = false
    })
  }

}

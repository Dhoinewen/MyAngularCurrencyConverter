import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICurrencies} from "../models/currency";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICurrencies[]> {
    return this.http.get<ICurrencies[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  }
}

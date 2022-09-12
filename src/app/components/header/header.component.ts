import {Component, Input, OnInit} from '@angular/core';
import {ICurrencies} from "../../models/currency";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'currency converter';

  @Input() USD: ICurrencies
  @Input() EUR: ICurrencies

  ngOnInit(): void {
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent {
  @Input() usdRate: number;
  @Input() eurRate: number;
  date: Date = new Date();
}

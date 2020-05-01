import { Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from '@angular/common';

@Pipe({name: 'formatNumber'})
export class FormatNumberPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, digitsInfo?: string): string {
    let formattedValue = this.decimalPipe.transform(value, digitsInfo ? digitsInfo : '1.2-2');
    return formattedValue.replace(/,/g, ' ');
  }
}
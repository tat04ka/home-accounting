import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';

import { AppEvent } from '../../shared/models/event.model';
import { Message } from 'src/app/shared/models/message.model';
import { Category } from '../../shared/models/category.model';
import * as fromApp from '../../../store/app.reducer';
import * as RecordActions from '../store/record.actions';
import * as BillActions from '../../bill/store/bill.actions';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  categoriesOptions: SelectItem[] = [];
  currentCategoryId = 1;
  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Expence'}
  ];
  message: Message;
  bill: number;

  @Input() set categories(categories: Category[]) {
    this.categoriesOptions = [];
    categories.forEach(category => {
      this.categoriesOptions.push({
        label: category.name,
        value: category.id
      })
    });
  };

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.store.select('bill').subscribe(billState => {
      if (billState.account) {
        this.bill = billState.account;
      }
    });
  }

  private showMessage(text: string, type: string) {
    this.message.text = text;
    this.message.type = type;

    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount < 0) {
      amount *= -1;
    }

    const event = new AppEvent(type, amount, category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    if (type === 'outcome') {
      if (amount > this.bill) {
        this.showMessage('Not enough funds', 'danger');
      } else {
        this.bill -= amount;
      }
    } else {
      this.bill += amount;
    }
    this.store.dispatch(new BillActions.UpdateBill(this.bill));
    this.store.dispatch(new RecordActions.AddEventStart(event));
    this.store.select('record').subscribe(recordState => {
      if (recordState.actionFinished && recordState.actionFinished === RecordActions.ADD_EVENT) {
        this.showMessage('Event added successfully', 'success');
        form.setValue({
          amount: 0,
          description: ' ',
          category: 1,
          type: 'outcome'
        });
      }
    });
  }
}

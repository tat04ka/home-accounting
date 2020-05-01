import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { AccountService } from '../../shared/services/account.service';
import { Account } from '../../shared/models/account.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  categoriesOptions: SelectItem[] = [];
  currentCategoryId = 1;
  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Expence'}
  ];
  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  @Input() set categories(categories: Category[]) {
    this.categoriesOptions = [];
    categories.forEach(category => {
      this.categoriesOptions.push({
        label: category.name,
        value: category.id
      })
    });
  };

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.message = new Message('', 'danger');
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
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
    this.sub1 = this.accountService.getAccount().subscribe((account: Account) => {
      let value = 0;
      if (type === 'outcome') {
        if (amount > account.value) {
          this.showMessage('Not enough funds', 'danger');
          return;
        } else {
          value = account.value - amount;
        }
      } else {
        value = account.value + amount;
      }
      this.sub2 = this.accountService.updateAccount({value, currency: account.currency})
        .pipe(mergeMap(() => this.eventsService.addEvent(event)))
        .subscribe(() => {
          this.showMessage('Event added successfully', 'success');
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          });
        });
    });

  }
}

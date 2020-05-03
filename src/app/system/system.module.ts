import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { PlanningComponent } from './planning/planning.component';
import { RecordComponent } from './record/record.component';
import { AccountComponent } from './bill/account/account.component';
import { ExchangeRatesComponent } from './bill/exchange-rates/exchange-rates.component';
import { AddEventComponent } from './record/add-event/add-event.component';
import { AddCategoryComponent } from './record/add-category/add-category.component';
import { EditCategoryComponent } from './record/edit-category/edit-category.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { HoverDirective } from './shared/directives/hover.directive';
import { WhileDirective } from './shared/directives/while.directive';
import { FormatNumberPipe } from './shared/pipes/format-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    HeaderComponent,
    SidebarComponent,
    BillComponent,
    HistoryComponent,
    PlanningComponent,
    RecordComponent,
    AccountComponent,
    ExchangeRatesComponent,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DropdownDirective,
    HoverDirective,
    WhileDirective,
    FormatNumberPipe
  ],
  providers: [
    DecimalPipe
  ]
})
export class SystemModule {}
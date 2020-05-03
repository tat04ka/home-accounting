import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './shared/services/users.service';
import { AuthGuard } from './shared/services/auth.guard';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecordEffects } from './system/record/store/record.effects';
import { BillEffects } from './system/bill/store/bill.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecordEffects, BillEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    AuthModule
  ],
  providers: [
    UsersService,
    AuthGuard
  ],
  exports: [
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

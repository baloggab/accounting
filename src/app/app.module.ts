import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    AddTransactionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    FormsModule
    ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

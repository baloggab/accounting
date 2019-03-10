import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { Transaction } from '../models/transaction.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  transactions: Array<Transaction>;

  constructor(private _dataService: DataService) {
    this.reload();
  }

  private reload() {
    this._dataService.getTransactions()
        .subscribe(res => {
          this.transactions = res.map(r => Transaction.fromObject(r));
          console.log(this.transactions);
          });
  }

  loadTransaction(tran:Transaction) {
    this._dataService.load.emit(Object.assign({}, tran));
  }

  ngOnInit() {
    this._dataService.change.subscribe(() => this.reload());
  }

  ngOnDestroy() {
    this._dataService.change.unsubscribe();
  }

}

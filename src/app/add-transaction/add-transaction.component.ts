import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { Transaction } from '../models/transaction.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { transition } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit, OnDestroy {

  atypes:string[] = [
    'rezsi', 'kaja', 'hitel', 'luxus', 'jatek', 'kp', 'ovi', 'sporolas', 'bevetel', 'egyszeri'
  ];
  private tran : Transaction;
  private saved : Boolean;
  private error : String;

  constructor(private _dataService: DataService) {
    this.tran = new Transaction();
    this.saved = false;
  }

  getTransaction() : Transaction {
    return this.tran;
  }

  addTransaction() {
    if (this.tran._id) {
      this._dataService.updateTransaction(this.tran)
        .subscribe(
          res => { this.saved = true; this._dataService.change.emit(); },
          err => this.error = err);
    } else {
      this._dataService.addTransaction(this.tran)
        .subscribe(
          res => { this.saved = true; this._dataService.change.emit(); },
          err => this.error = err);
    }
  }

  clearTransacionData() {
    this.tran = new Transaction();
  }

  ngOnInit() {
    this._dataService.load.subscribe((tran) => { this.tran = tran; this.saved = false; });
  }

  ngOnDestroy() {
    this._dataService.load.unsubscribe();
  }
}

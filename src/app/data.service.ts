import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Transaction } from './models/transaction.model';

@Injectable()
export class DataService {

  result:any;

  @Output()
  change = new EventEmitter();

  @Output()
  load : EventEmitter<Transaction> = new EventEmitter<Transaction>();

  constructor(private _http: Http) { }

  getTransactions() {
    return this._http.get("/api/transactions")
      .map(result => this.result = result.json().data);
  }

  addTransaction(tran:Transaction) {
    return this._http.post("/api/transaction", tran);
  }

  updateTransactions(trans:Array<Transaction>) {
    return this._http.put("/api/transactions", trans);
  }

  updateTransaction(tran:Transaction) {
    return this.updateTransactions([tran]);
  }
}
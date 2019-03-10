export class Transaction {
    _id: String;
    date: Date;
    atype: String;
    desc: String;
    amount: Number;

    constructor(i:String = '', d:Date = new Date(), a:String = '', de:String = '', am: Number = 0.0) {
        this._id = i;this.date = d; this.atype = a; this.desc = de; this.amount = am;
    }

    static fromObject(o:any) {
        return new Transaction(o["_id"], o["date"], o["atype"], o["desc"], o["amount"]);
    }
}
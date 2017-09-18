import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PersonalCustomer } from '../';

@Injectable()
export class NewPersonalCustomerService {
    cust: PersonalCustomer = null;

    subject: BehaviorSubject<any> = new BehaviorSubject<any>(this.cust);
    constructor() { };

    setNewCustomer(c: PersonalCustomer) {
        this.cust = c;
        this.subject.next(this.cust);
    }

}

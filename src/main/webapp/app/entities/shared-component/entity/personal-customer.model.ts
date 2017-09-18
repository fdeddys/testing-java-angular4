import { BaseEntity, Person, PartyRole } from '../';

export class PersonalCustomer extends PartyRole {
    constructor(
        public person?: any
    ) {
        super();
        this.person = new Person();
    }
}

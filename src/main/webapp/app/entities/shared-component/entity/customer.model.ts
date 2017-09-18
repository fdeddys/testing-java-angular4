import { BaseEntity, PartyRole } from './..';

export class Customer extends PartyRole {
    constructor(
        public idCustomer?: string,
    ) {
        super();
    }
}

import { BaseEntity, Organization, PartyRole } from './..';

export class Vendor extends PartyRole {
    constructor(
        public idVendor?: string,
        public organization?: any,
    ) {
        super();
        this.organization = new Organization();
    }
}

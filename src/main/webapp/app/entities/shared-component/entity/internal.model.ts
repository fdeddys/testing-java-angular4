import { PartyRole, Organization } from '../';

export class Internal extends PartyRole {
    constructor(
        public idInternal?: string,
        public organization?: Organization,
    ) {
        super();
        this.organization = new Organization();
    }
}

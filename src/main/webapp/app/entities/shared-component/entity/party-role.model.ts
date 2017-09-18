import { BaseEntity } from '../';

export class PartyRole implements BaseEntity {
    constructor(
        public id?: any,
        public idPartyRole?: any,
        public dateRegister?: any,
        public dateFrom?: any,
        public dateThru?: any,
        public roleTypeId?: any,
        public partyId?: any,
        public partyName?: any,
    ) {
    }
}

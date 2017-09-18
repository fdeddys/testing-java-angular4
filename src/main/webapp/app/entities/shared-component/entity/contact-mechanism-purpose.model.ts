import { BaseEntity } from '../';

export class ContactMechanismPurpose implements BaseEntity {
    constructor(
        public id?: any,
        public idContactMechPurpose?: any,
        public idPurposeType?: number,
        public dateFrom?: any,
        public dateThru?: any,
        public partyId?: any,
        public contactId?: any,
        public contact?: any,
        public postal?: any,
        public telco?: any,
        public electronic?: any,
    ) {
    }
}

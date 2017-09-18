import { BaseEntity } from './../../../shared';
import { Party, ContactMechanismPurpose, PostalAddress, ElectronicAddress, TelecomunicationNumber } from '../';

export class Person extends Party {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public pob?: string,
        public bloodType?: string,
        public gender?: string,
        public dob?: any,
        public personalIdNumber?: string,
        public familyIdNumber?: string,
        public taxNumber?: string,
        public religionTypeId?: any,
        public workTypeId?: any,
        public userId?: any,
        public postalAddress?: any,
        public cellPhone1?: any,
        public cellPhone2?: any,
        public phone?: any,
        public privateMail?: any,
    ) {
        super();
        this.privateMail = new ElectronicAddress();
        this.cellPhone1 = new TelecomunicationNumber();
        this.cellPhone2 = new TelecomunicationNumber();
        this.phone = new TelecomunicationNumber();
        this.postalAddress = new PostalAddress();
    }
}

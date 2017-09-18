import { PostalAddress, ElectronicAddress, TelecomunicationNumber, Party } from '../';

export class Organization extends Party {
    constructor(
        public name?: string,
        public postalAddress?: any,
        public officeMail?: any,
    ) {
        super();
        this.postalAddress = new PostalAddress();
        this.officeMail = new ElectronicAddress();
    }
}

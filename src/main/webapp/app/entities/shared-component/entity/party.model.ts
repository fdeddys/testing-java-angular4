import { BaseEntity } from '../';
import { ContactMechanismPurpose, PostalAddress, ElectronicAddress, TelecomunicationNumber } from '../';

export class Party implements BaseEntity {
    constructor(
        public id?: any,
        public idParty?: any,
        public name?: string,
        public categories?: any,
        public facilities?: any,
        public contactPurposes?: ContactMechanismPurpose[],
    ) {
        this.contactPurposes = [];
    }

    getPostalAddress(id: number): PostalAddress {
        let purp: ContactMechanismPurpose =  null;
        purp =  this.contactPurposes.find((x) => x.idPurposeType === id);

        if (purp === null || purp === undefined) {
            purp = new ContactMechanismPurpose();
            purp.contact = new PostalAddress();
            purp.idPurposeType = id;
            purp.partyId = this.idParty;
            this.contactPurposes.push(purp);
        }
        if (purp.contact === undefined ||  purp.contact == null)  {
            purp.contact = new PostalAddress();
        }
        return <PostalAddress> purp.contact;
    }

    getElectronicAddress(id: number): ElectronicAddress {
        let purp: ContactMechanismPurpose =  null;
        purp =  this.contactPurposes.find((x) => x.idPurposeType === id);

        if (purp === null || purp === undefined) {
            purp = new ContactMechanismPurpose();
            purp.contact = new ElectronicAddress();
            purp.idPurposeType = id;
            purp.partyId = this.idParty;
            this.contactPurposes.push(purp);
        }
        return <ElectronicAddress> purp.contact;
    }

    getTelecomunicationNumber(id: number): TelecomunicationNumber {
        let purp: ContactMechanismPurpose =  null;
        purp =  this.contactPurposes.find((x) => x.idPurposeType === id);

        if (purp === null || purp === undefined) {
            purp = new ContactMechanismPurpose();
            purp.contact = new TelecomunicationNumber();
            purp.idPurposeType = id;
            purp.partyId = this.idParty;
            this.contactPurposes.push(purp);
        }
        return <TelecomunicationNumber> purp.contact;
    }

}

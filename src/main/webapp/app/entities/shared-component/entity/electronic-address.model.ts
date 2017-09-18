import { ContactMechanism } from './contact-mechanism.model';

export class ElectronicAddress extends ContactMechanism {
    constructor(
        public address?: string,
    ) {
        super();
    }
}

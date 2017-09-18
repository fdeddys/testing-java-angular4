import { ContactMechanism } from '../';

export class TelecomunicationNumber extends ContactMechanism {
    constructor(
        public number?: string,
    ) {
        super();
    }
}

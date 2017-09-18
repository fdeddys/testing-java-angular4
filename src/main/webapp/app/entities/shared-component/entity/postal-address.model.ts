import { ContactMechanism, BaseEntity } from '../';

export class PostalAddress implements BaseEntity {
    constructor(
        public id?: any,
        public idContact?: any,
        public idContactType?: number,
        public description?: string,
        public facilities?: any,
        public address1?: string,
        public address2?: string,
        public district?: string,
        public village?: string,
        public city?: string,
        public province?: string
    ) {
    }
}

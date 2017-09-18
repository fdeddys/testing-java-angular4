import { BaseEntity } from '../';

export class ContactMechanism implements BaseEntity {
    constructor(
        public id?: any,
        public idContact?: any,
        public idContactType?: number,
        public description?: string,
        public facilities?: any,
    ) {
    }
}

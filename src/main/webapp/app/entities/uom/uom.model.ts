import { BaseEntity } from './../../shared';

export class Uom implements BaseEntity {
    constructor(
        public id?: any,
        public idUom?: any,
        public description?: string,
        public abbreviation?: string,
    ) {
    }
}

import { BaseEntity } from '../';

export class Good implements BaseEntity {
    constructor(
        public id?: any,
        public idProduct?: any,
        public name?: string,
        public dateIntroduction?: any,
        public uomId?: any,
        public features?: any,
        public categories?: any,
    ) {
    }
}

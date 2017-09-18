import { BaseEntity } from '../';

export class Product implements BaseEntity {
    constructor(
        public id?: any,
        public idProduct?: any,
        public name?: string,
        public dateIntroduction?: any,
        public productTypeId?: any,
        public features?: any,
        public categories?: any,
    ) {
    }
}

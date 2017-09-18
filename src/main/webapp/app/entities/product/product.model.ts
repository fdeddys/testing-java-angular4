import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: any,
        public name?: string,
        public qty?: number,
        public price?: number,
        public discount?: number,
        public dateIntroduce?: any,
        public marketId?: any,
        public categories?: any,
    ) {
    }
}

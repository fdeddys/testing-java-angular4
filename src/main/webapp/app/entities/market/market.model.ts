import { BaseEntity } from './../../shared';

export class Market implements BaseEntity {
    constructor(
        public id?: number,
        public idMarket?: number,
        public description?: string,
    ) {
    }
}

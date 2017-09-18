import { BaseEntity } from './../../shared';

export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public idCategory?: number,
        public description?: string,
        public products?: BaseEntity[],
    ) {
    }
}

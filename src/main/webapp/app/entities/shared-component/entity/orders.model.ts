import { BaseEntity } from '../';

export class Orders implements BaseEntity {
    constructor(
        public id?: any,
        public idOrder?: any,
        public orderNumber?: string,
        public dateEntry?: any,
        public dateOrder?: any,
        public payments?: any,
        public details?: any,
        public orderTypeId?: any,
    ) {
    }
}

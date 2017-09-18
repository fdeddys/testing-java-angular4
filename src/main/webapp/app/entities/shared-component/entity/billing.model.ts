import { BaseEntity } from '../';

export class Billing implements BaseEntity {
    constructor(
        public id?: any,
        public idBilling?: any,
        public billingNumber?: string,
        public dateCreate?: any,
        public payments?: any,
        public details?: any,
        public billingTypeId?: any,
    ) {
    }
}

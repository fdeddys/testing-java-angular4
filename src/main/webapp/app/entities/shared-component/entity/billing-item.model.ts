import { BaseEntity } from '../';

export class BillingItem implements BaseEntity {
    constructor(
        public id?: any,
        public idBillingItem?: any,
        public itemDescription?: string,
        public qty?: number,
        public unitPrice?: number,
        public billingId?: any,
        public orderItems?: any,
    ) {
    }
}

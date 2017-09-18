import { BaseEntity } from '../';

export class OrderItem implements BaseEntity {
    constructor(
        public id?: any,
        public idOrderItem?: any,
        public qty?: number,
        public unitPrice?: number,
        public itemDescription?: string,
        public ordersId?: any,
        public shipmentItems?: any,
        public billingItems?: any,
        public requirements?: any,
    ) {
    }
}

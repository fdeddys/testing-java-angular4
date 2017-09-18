import { BaseEntity } from '../';

export class ShipmentItem implements BaseEntity {
    constructor(
        public id?: any,
        public idShipmentItem?: any,
        public qty?: number,
        public contentDescription?: string,
        public shipmentId?: any,
        public orderItems?: any,
        public shipmentReceipts?: any,
    ) {
    }
}

import { BaseEntity } from '../';

export class Shipment implements BaseEntity {
    constructor(
        public id?: any,
        public idShipment?: any,
        public shipmentNumber?: string,
        public description?: string,
        public details?: any,
    ) {
    }
}

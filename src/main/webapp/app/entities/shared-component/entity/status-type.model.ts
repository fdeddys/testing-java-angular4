import { BaseEntity } from '../';

export class StatusType implements BaseEntity {
    constructor(
        public id?: number,
        public idStatusType?: number,
        public description?: string,
    ) {
    }
}

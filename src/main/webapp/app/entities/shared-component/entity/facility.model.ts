import { BaseEntity } from '../';

export class Facility implements BaseEntity {
    constructor(
        public id?: any,
        public idFacility?: any,
        public facilityCode?: string,
        public description?: string,
        public facilityTypeId?: any,
        public partOfId?: any,
        public contacts?: any,
        public parties?: any,
        public contactPurposes?: any,
    ) {
    }
}

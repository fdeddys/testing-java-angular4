import { BaseEntity } from '../';

export class WorkEffort implements BaseEntity {
    constructor(
        public id?: any,
        public idWe?: any,
        public name?: string,
        public description?: string,
        public payments?: any,
        public facilityId?: any,
        public workTypeId?: any,
    ) {
    }
}

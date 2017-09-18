import { BaseEntity } from '../';

export class Requirement implements BaseEntity {
    constructor(
        public id?: any,
        public idRequirement?: any,
        public requirementNumber?: string,
        public description?: string,
        public dateCreate?: any,
        public dateRequired?: any,
        public budget?: number,
        public qty?: number,
        public orderItems?: any,
        public payments?: any,
        public facilityId?: any,
        public items?: any,
        public parentId?: any,
    ) {
    }
}

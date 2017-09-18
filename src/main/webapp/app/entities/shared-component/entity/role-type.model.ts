import { BaseEntity } from '../';

export class RoleType implements BaseEntity {
    constructor(
        public id?: number,
        public idRoleType?: number,
        public description?: string,
    ) {
    }
}

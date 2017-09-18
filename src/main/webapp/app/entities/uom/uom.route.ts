import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UomComponent } from './uom.component';
import { UomPopupComponent } from './uom-dialog.component';

@Injectable()
export class UomResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'idUom,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const uomRoute: Routes = [
    {
        path: 'uom',
        component: UomComponent,
        resolve: {
            'pagingParams': UomResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.uom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const uomPopupRoute: Routes = [
    {
        path: 'uom-new',
        component: UomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.uom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'uom/:id/edit',
        component: UomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.uom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

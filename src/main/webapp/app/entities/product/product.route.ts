import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductComponent } from './product.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductLovPopupComponent } from './product-as-lov.component';
import { ProductPopupComponent } from './product-dialog.component';

@Injectable()
export class ProductResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const productRoute: Routes = [
    {
        path: 'product',
        component: ProductComponent,
        resolve: {
            'pagingParams': ProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-lov',
        component: ProductLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-new',
        component: ProductEditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product/:id/edit',
        component: ProductEditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-popup-new',
        component: ProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product/:id/popup-edit',
        component: ProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

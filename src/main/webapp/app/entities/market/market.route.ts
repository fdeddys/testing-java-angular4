import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MarketComponent } from './market.component';
import { MarketPopupComponent } from './market-dialog.component';

@Injectable()
export class MarketResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'idMarket,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const marketRoute: Routes = [
    {
        path: 'market',
        component: MarketComponent,
        resolve: {
            'pagingParams': MarketResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.market.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marketPopupRoute: Routes = [
    {
        path: 'market-new',
        component: MarketPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.market.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'market/:id/edit',
        component: MarketPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coreApp.market.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

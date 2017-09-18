import './vendor.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';

import {CoreSharedModule, UserRouteAccessService} from './shared';
import {CoreHomeModule} from './home/home.module';
import {CoreAdminModule} from './admin/admin.module';
import {CoreAccountModule} from './account/account.module';
import {CoreEntityModule} from './entities/entity.module';

import {customHttpProvider} from './blocks/interceptor/http.provider';
import {PaginationConfig} from './blocks/config/uib-pagination.config';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GrowlModule, ConfirmationService} from 'primeng/primeng';
import {CoreUIModule} from './dashboard';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        CoreUIModule,
        BrowserAnimationsModule,
        GrowlModule,
        CoreSharedModule,
        CoreHomeModule,
        CoreAdminModule,
        CoreAccountModule,
        CoreEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
        ConfirmationService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class CoreAppModule {}

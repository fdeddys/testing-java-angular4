import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreSharedModule} from '../../shared';
import {
    MarketService,
    MarketPopupService,
    MarketComponent,
    MarketDialogComponent,
    MarketPopupComponent,
    marketRoute,
    marketPopupRoute,
    MarketResolvePagingParams,
} from './';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AutoCompleteModule,
         CheckboxModule,
         InputTextModule,
         InputTextareaModule,
         CalendarModule,
         DropdownModule,
         EditorModule,
         ButtonModule,
         DataTableModule,
         DataListModule,
         DataGridModule,
         DataScrollerModule,
         CarouselModule,
         PickListModule,
         PaginatorModule,
         DialogModule,
         ConfirmDialogModule,
         ConfirmationService,
         GrowlModule,
         SharedModule,
         AccordionModule,
         TabViewModule,
         FieldsetModule,
         ScheduleModule,
         PanelModule,
         ListboxModule,
         ChartModule,
         DragDropModule,
         LightboxModule
        } from 'primeng/primeng';

import { SharedEntityModule } from '../shared-component';

const ENTITY_STATES = [
    ...marketRoute,
    ...marketPopupRoute,
];

@NgModule({
    imports: [
        CoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        SharedEntityModule,
        BrowserAnimationsModule,
        EditorModule,
        InputTextareaModule,
        ButtonModule,
        DataTableModule,
        DataListModule,
        DataGridModule,
        DataScrollerModule,
        CarouselModule,
        PickListModule,
        PaginatorModule,
        ConfirmDialogModule,
        TabViewModule,
        ScheduleModule,
        AutoCompleteModule,
        CheckboxModule,
        CalendarModule,
        DropdownModule,
        ListboxModule,
        FieldsetModule,
        PanelModule,
        DialogModule,
        AccordionModule,
        PanelModule,
        ChartModule,
        DragDropModule,
        LightboxModule,
        CurrencyMaskModule
    ],
    exports: [
        MarketComponent,
    ],
    declarations: [
        MarketComponent,
        MarketDialogComponent,
        MarketPopupComponent,
    ],
    entryComponents: [
        MarketComponent,
        MarketDialogComponent,
        MarketPopupComponent,
    ],
    providers: [
        MarketService,
        MarketPopupService,
        MarketResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreMarketModule {}

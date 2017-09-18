import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreSharedModule } from '../../shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PersonViewComponent,
         OrganizationViewComponent,
         NewPersonalCustomerService,
         PartyService,
         PersonService,
         OrganizationService,
         PartyRoleService,
         GoodService,
         InternalService,
         ProductService,
         RoleTypeService,
         StatusTypeService,
         CustomerService,
         VendorService } from './';

import { AutoCompleteModule,
         CheckboxModule,
         InputTextModule,
         CalendarModule,
         DropdownModule,
         ButtonModule,
         DataTableModule,
         PaginatorModule,
         ConfirmDialogModule,
         ConfirmationService,
         GrowlModule,
         DataGridModule,
         SharedModule,
         AccordionModule,
         TabViewModule,
         FieldsetModule,
         ScheduleModule,
         PanelModule,
         ListboxModule,
         SelectItem,
         MenuItem,
         Header,
         Footer} from 'primeng/primeng';

@NgModule({
    imports: [
        CoreSharedModule,
        RouterModule,
        BrowserAnimationsModule,
        ButtonModule,
        DataTableModule,
        PaginatorModule,
        ConfirmDialogModule,
        TabViewModule,
        DataGridModule,
        ScheduleModule,
        AutoCompleteModule,
        CheckboxModule,
        CalendarModule,
        DropdownModule,
        ListboxModule,
        FieldsetModule,
        PanelModule,
        CurrencyMaskModule
    ],
    exports: [
        PersonViewComponent,
        OrganizationViewComponent
    ],
    declarations: [
        PersonViewComponent,
        OrganizationViewComponent
    ],
    entryComponents: [
    ],
    providers: [
        NewPersonalCustomerService,
        PartyService,
        PersonService,
        OrganizationService,
        PartyRoleService,
        GoodService,
        InternalService,
        ProductService,
        RoleTypeService,
        StatusTypeService,
        CustomerService,
        VendorService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedEntityModule {}

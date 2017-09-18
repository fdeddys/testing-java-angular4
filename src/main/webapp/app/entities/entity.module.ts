import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CoreMarketModule } from './market/market.module';
import { CoreCategoryModule } from './category/category.module';
import { CoreProductModule } from './product/product.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CoreMarketModule,
        CoreCategoryModule,
        CoreProductModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreEntityModule {}

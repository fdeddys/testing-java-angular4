import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { ToasterService} from '../../shared';
import { Market, MarketService } from '../market';
import { Category, CategoryService } from '../category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-product-edit',
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    product: Product;
    isSaving: boolean;

    markets: Market[];

    categories: Category[];

    constructor(
        private alertService: JhiAlertService,
        private productService: ProductService,
        private marketService: MarketService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private toaster: ToasterService
    ) {
        this.product = new Product();
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.load(params['id']);
            }
        });
        this.isSaving = false;
        this.marketService.query()
            .subscribe((res: ResponseWrapper) => { this.markets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    load(id) {
        this.productService.find(id).subscribe((product) => {
            this.product = product;
        });
    }

    previousState() {
        this.router.navigate(['product']);
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<Product>) {
        result.subscribe((res: Product) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Product) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.toaster.showToaster('info', 'Save', 'product saved !');
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.toaster.showToaster('warning', 'product Changed', error.message);
        this.alertService.error(error.message, null, null);
    }

    trackMarketById(index: number, item: Market) {
        return item.idMarket;
    }

    trackCategoryById(index: number, item: Category) {
        return item.idCategory;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

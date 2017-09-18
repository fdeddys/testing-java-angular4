import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Category } from './category.model';
import { CategoryService } from './category.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

import { LazyLoadEvent } from 'primeng/primeng';
import { ToasterService } from '../../shared/alert/toaster.service';
import { ConfirmationService } from 'primeng/primeng';
import { ProductService } from '../product';

@Component({
    selector: 'jhi-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {

    currentAccount: any;
    categories: Category[];
    error: any;
    success: any;
    prodSub: Subscription;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private categoryService: CategoryService,
        private confirmationService: ConfirmationService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private toasterService: ToasterService,
        private productService: ProductService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCategories();
        this.prodSub = this.productService.values.subscribe((r) => {
            console.log('Nilai : ', r);
        })
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.prodSub.unsubscribe();
    }
    
    loadAll() {
        if (this.currentSearch) {
            this.categoryService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()}).subscribe(
                    (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
        }
        this.categoryService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/category'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/category', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/category', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    trackId(index: number, item: Category) {
        return item.idCategory;
    }

    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe('categoryListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'idCategory') {
            result.push('idCategory');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.categories = data;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    executeProcess(data) {
        this.categoryService.executeProcess(0, null, data).subscribe(
           (value) => console.log('this: ', value),
           (err) => console.log(err),
           () => this.toasterService.showToaster('info', 'Data Proces', 'Done process in system..')
        );
    }

    loadDataLazy(event: LazyLoadEvent) {
        this.itemsPerPage = event.rows;
        this.page = Math.ceil(event.first / this.itemsPerPage) + 1;

        if (event.sortField !== undefined) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder;
        }
        this.loadAll();
    }

    updateRowData(event) {
        if (event.data.id !== undefined) {
            this.categoryService.update(event.data)
                .subscribe((res: Category) =>
                    this.onRowDataSaveSuccess(res), (res: Response) => this.onRowDataSaveError(res));
        } else {
            this.categoryService.create(event.data)
                .subscribe((res: Category) =>
                    this.onRowDataSaveSuccess(res), (res: Response) => this.onRowDataSaveError(res));
        }
    }

    private onRowDataSaveSuccess(result: Category) {
        this.toasterService.showToaster('info', 'Category Saved', 'Data saved..');
    }

    private onRowDataSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.onError(error);
    }

    delete(id: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.categoryService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'categoryListModification',
                    content: 'Deleted an category'
                    });
                });
            }
        });
    }
}

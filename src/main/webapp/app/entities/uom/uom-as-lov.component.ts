import {Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import {Uom} from './uom.model';
import {UomService} from './uom.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {UomPopupService} from './uom-popup.service';

import {LazyLoadEvent} from 'primeng/primeng';
import {ToasterService} from '../../shared/alert/toaster.service';

@Component({
    selector: 'jhi-uom-as-lov',
    templateUrl: './uom-as-lov.component.html'
})
export class UomAsLovComponent implements OnInit, OnDestroy {

    currentAccount: any;
    isSaving: boolean;
    uoms: Uom[];
    selected: Uom[];
    error: any;
    success: any;
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
        public activeModal: NgbActiveModal,
        private uomService: UomService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private toasterService: ToasterService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
        this.predicate = 'idUom';
        this.reverse = 'asc';
        this.isSaving = false;
    }

    loadAll() {
        if (this.currentSearch) {
            this.uomService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()}).subscribe(
                    (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
        }
        this.uomService.query({
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
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
    }

    trackId(index: number, item: Uom) {
        return item.idUom;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'idUom') {
            result.push('idUom');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.uoms = data;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    pushData() {
        this.uomService.pushItems(this.selected);
        this.activeModal.dismiss('close');
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

    clearPage() {
        this.activeModal.dismiss('cancel');
    }

}

@Component({
    selector: 'jhi-uom-lov-popup',
    template: ''
})
export class UomLovPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private uomPopupService: UomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.uomPopupService
                .load(UomAsLovComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

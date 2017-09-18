import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Market} from './market.model';
import {MarketPopupService} from './market-popup.service';
import {MarketService} from './market.service';
import {ToasterService} from '../../shared';

@Component({
    selector: 'jhi-market-dialog',
    templateUrl: './market-dialog.component.html'
})
export class MarketDialogComponent implements OnInit {

    market: Market;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private marketService: MarketService,
        private eventManager: JhiEventManager,
        private toaster: ToasterService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.market.idMarket !== undefined) {
            this.subscribeToSaveResponse(
                this.marketService.update(this.market));
        } else {
            this.subscribeToSaveResponse(
                this.marketService.create(this.market));
        }
    }

    private subscribeToSaveResponse(result: Observable<Market>) {
        result.subscribe((res: Market) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Market) {
        this.eventManager.broadcast({ name: 'marketListModification', content: 'OK'});
        this.toaster.showToaster('info', 'Save', 'market saved !');
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.toaster.showToaster('warning', 'market Changed', error.message);
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-market-popup',
    template: ''
})
export class MarketPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marketPopupService: MarketPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.marketPopupService
                    .open(MarketDialogComponent as Component, params['id']);
            } else {
                this.marketPopupService
                    .open(MarketDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

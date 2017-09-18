import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Uom} from './uom.model';
import {UomPopupService} from './uom-popup.service';
import {UomService} from './uom.service';
import {ToasterService} from '../../shared';

@Component({
    selector: 'jhi-uom-dialog',
    templateUrl: './uom-dialog.component.html'
})
export class UomDialogComponent implements OnInit {

    uom: Uom;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private uomService: UomService,
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
        if (this.uom.idUom !== undefined) {
            this.subscribeToSaveResponse(
                this.uomService.update(this.uom));
        } else {
            this.subscribeToSaveResponse(
                this.uomService.create(this.uom));
        }
    }

    private subscribeToSaveResponse(result: Observable<Uom>) {
        result.subscribe((res: Uom) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Uom) {
        this.eventManager.broadcast({ name: 'uomListModification', content: 'OK'});
        this.toaster.showToaster('info', 'Save', 'uom saved !');
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.toaster.showToaster('warning', 'uom Changed', error.message);
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-uom-popup',
    template: ''
})
export class UomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private uomPopupService: UomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.uomPopupService
                    .open(UomDialogComponent as Component, params['id']);
            } else {
                this.uomPopupService
                    .open(UomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

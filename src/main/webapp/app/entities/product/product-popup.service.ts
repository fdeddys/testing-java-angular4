import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable()
export class ProductPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private productService: ProductService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productService.find(id).subscribe((data) => {
                    // if (data.dateIntroduce) {
                    //    data.dateIntroduce = this.datePipe
                    //        .transform(data.dateIntroduce, 'yyyy-MM-ddTHH:mm:ss');
                    // }
                    this.ngbModalRef = this.productModalRef(component, data);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const data = new Product();
                    this.ngbModalRef = this.productModalRef(component, data);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productModalRef(component: Component, product: Product): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.product = product;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

    load(component: Component): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                this.ngbModalRef = this.productLoadModalRef(component);
                resolve(this.ngbModalRef);
            }, 0);
        });
    }

    productLoadModalRef(component: Component): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Customer } from '../';
import { ResponseWrapper, createRequestOption } from '../../../shared';

import * as moment from 'moment';

@Injectable()
export class CustomerService {

    private resourceUrl = 'api/customers';
    private resourceSearchUrl = 'api/_search/customers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(customer: Customer): Observable<Customer> {
        const copy = this.convert(customer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(customer: Customer): Observable<Customer> {
        const copy = this.convert(customer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: any): Observable<Customer> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id?: any): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    executeProcess(customer: any): Observable<String> {
        const copy = this.convert(customer);
        return this.http.post(this.resourceUrl + '/execute', copy).map((res: Response) => {
            return res.json();
        });
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        if (entity.dateRegister) {
            entity.dateRegister = new Date(entity.dateRegister);
        }
        if (entity.dateFrom) {
            entity.dateFrom = new Date(entity.dateFrom);
        }
        if (entity.dateThru) {
            entity.dateThru = new Date(entity.dateThru);
        }
    }

    private convert(customer: Customer): Customer {
        const copy: Customer = Object.assign({}, customer);

        // copy.dateRegister = this.dateUtils.toDate(customer.dateRegister);

        // copy.dateFrom = this.dateUtils.toDate(customer.dateFrom);

        // copy.dateThru = this.dateUtils.toDate(customer.dateThru);
        return copy;
    }
}

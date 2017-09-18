import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Internal } from '../';
import { ResponseWrapper, createRequestOption } from '../../../shared';

import * as moment from 'moment';

@Injectable()
export class InternalService {

    private resourceUrl = 'api/internals';
    private resourceSearchUrl = 'api/_search/internals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(internal: Internal): Observable<Internal> {
        const copy = this.convert(internal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(internal: Internal): Observable<Internal> {
        const copy = this.convert(internal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: any): Observable<Internal> {
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

    executeProcess(internal: any): Observable<String> {
        const copy = this.convert(internal);
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

    private convert(internal: Internal): Internal {
        const copy: Internal = Object.assign({}, internal);

        // copy.dateRegister = this.dateUtils.toDate(internal.dateRegister);

        // copy.dateFrom = this.dateUtils.toDate(internal.dateFrom);

        // copy.dateThru = this.dateUtils.toDate(internal.dateThru);
        return copy;
    }
}

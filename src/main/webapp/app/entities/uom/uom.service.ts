import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SERVER_API_URL } from '../../app.constants';

import { Uom } from './uom.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

import * as moment from 'moment';

@Injectable()
export class UomService {
    private itemValues: Uom[];
    values: BehaviorSubject<any> = new BehaviorSubject<any>(this.itemValues);

    private resourceUrl = SERVER_API_URL + 'api/uoms';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/uoms';

    constructor(private http: Http) { }

    create(uom: Uom): Observable<Uom> {
        const copy = this.convert(uom);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(uom: Uom): Observable<Uom> {
        const copy = this.convert(uom);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: any): Observable<Uom> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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

    executeProcess(id: Number, param: String, uom: Uom): Observable<Uom> {
        const copy = this.convert(uom);
        return this.http.post(`${this.resourceUrl}/execute/${id}/${param}`, copy).map((res: Response) => {
            return res.json();
        });
    }

    executeListProcess(id: Number, param: String, uoms: Uom[]): Observable<Uom[]> {
        const copy = this.convertList(uoms);
        return this.http.post(`${this.resourceUrl}/execute-list/${id}/${param}`, copy).map((res: Response) => {
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(uom: Uom): Uom {
        if (uom === null || uom === {}) {
            return {};
        }
        // const copy: Uom = Object.assign({}, uom);
        const copy: Uom = JSON.parse(JSON.stringify(uom));
        return copy;
    }

    private convertList(uoms: Uom[]): Uom[] {
        const copy: Uom[] = uoms;
        copy.forEach((item) => {
            item = this.convert(item);
        });
        return copy;
    }

    pushItems(data: Uom[]) {
        this.itemValues = data;
        this.values.next(this.itemValues);
    }
}

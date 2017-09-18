import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SERVER_API_URL } from '../../app.constants';

import { Category } from './category.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

import * as moment from 'moment';

@Injectable()
export class CategoryService {
    private itemValues: Category[];
    values: BehaviorSubject<any> = new BehaviorSubject<any>(this.itemValues);

    private resourceUrl = SERVER_API_URL + 'api/categories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/categories';

    constructor(private http: Http) { }

    create(category: Category): Observable<Category> {
        const copy = this.convert(category);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(category: Category): Observable<Category> {
        const copy = this.convert(category);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: any): Observable<Category> {
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

    executeProcess(id: Number, param: String, category: Category): Observable<Category> {
        const copy = this.convert(category);
        return this.http.post(`${this.resourceUrl}/execute/${id}/${param}`, copy).map((res: Response) => {
            return res.json();
        });
    }

    executeListProcess(id: Number, param: String, categorys: Category[]): Observable<Category[]> {
        const copy = this.convertList(categorys);
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

    private convert(category: Category): Category {
        if (category === null || category === {}) {
            return {};
        }
        // const copy: Category = Object.assign({}, category);
        const copy: Category = JSON.parse(JSON.stringify(category));
        return copy;
    }

    private convertList(categorys: Category[]): Category[] {
        const copy: Category[] = categorys;
        copy.forEach((item) => {
            item = this.convert(item);
        });
        return copy;
    }

    pushItems(data: Category[]) {
        this.itemValues = data;
        this.values.next(this.itemValues);
    }
}

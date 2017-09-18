import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SERVER_API_URL } from '../../app.constants';

import { Market } from './market.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

import * as moment from 'moment';

@Injectable()
export class MarketService {
    private itemValues: Market[];
    values: BehaviorSubject<any> = new BehaviorSubject<any>(this.itemValues);

    private resourceUrl = SERVER_API_URL + 'api/markets';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/markets';

    constructor(private http: Http) { }

    create(market: Market): Observable<Market> {
        const copy = this.convert(market);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(market: Market): Observable<Market> {
        const copy = this.convert(market);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: any): Observable<Market> {
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

    executeProcess(id: Number, param: String, market: Market): Observable<Market> {
        const copy = this.convert(market);
        return this.http.post(`${this.resourceUrl}/execute/${id}/${param}`, copy).map((res: Response) => {
            return res.json();
        });
    }

    executeListProcess(id: Number, param: String, markets: Market[]): Observable<Market[]> {
        const copy = this.convertList(markets);
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

    private convert(market: Market): Market {
        if (market === null || market === {}) {
            return {};
        }
        // const copy: Market = Object.assign({}, market);
        const copy: Market = JSON.parse(JSON.stringify(market));
        return copy;
    }

    private convertList(markets: Market[]): Market[] {
        const copy: Market[] = markets;
        copy.forEach((item) => {
            item = this.convert(item);
        });
        return copy;
    }

    pushItems(data: Market[]) {
        this.itemValues = data;
        this.values.next(this.itemValues);
    }
}

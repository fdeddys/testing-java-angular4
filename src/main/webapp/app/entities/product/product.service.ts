import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';

import { Product } from './product.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

import * as moment from 'moment';

@Injectable()
export class ProductService {
    private itemValues: Product[];
    values: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.itemValues);

    private resourceUrl = SERVER_API_URL + 'api/products';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/products';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(product: Product): Observable<Product> {
        const copy = this.convert(product);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(product: Product): Observable<Product> {
        const copy = this.convert(product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: any): Observable<Product> {
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

    executeProcess(id: Number, param: String, product: Product): Observable<Product> {
        const copy = this.convert(product);
        return this.http.post(`${this.resourceUrl}/execute/${id}/${param}`, copy).map((res: Response) => {
            return res.json();
        });
    }

    executeListProcess(id: Number, param: String, products: Product[]): Observable<Product[]> {
        const copy = this.convertList(products);
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        if (entity.dateIntroduce) {
            entity.dateIntroduce = new Date(entity.dateIntroduce);
        }
    }

    private convert(product: Product): Product {
        if (product === null || product === {}) {
            return {};
        }
        // const copy: Product = Object.assign({}, product);
        const copy: Product = JSON.parse(JSON.stringify(product));

        // copy.dateIntroduce = this.dateUtils.toDate(product.dateIntroduce);
        return copy;
    }

    private convertList(products: Product[]): Product[] {
        const copy: Product[] = products;
        copy.forEach((item) => {
            item = this.convert(item);
        });
        return copy;
    }

    pushItems(data: Product[]) {
        this.itemValues = data;
        this.values.next(this.itemValues);
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Person } from '../';
import { ResponseWrapper, createRequestOption } from '../../../shared';

import * as moment from 'moment';

@Injectable()
export class PersonService {

    private resourceUrl = 'api/people';
    private resourceSearchUrl = 'api/_search/people';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(person: Person): Observable<Person> {
        const copy = this.convert(person);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(person: Person): Observable<Person> {
        const copy = this.convert(person);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: any): Observable<Person> {
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

    executeProcess(person: any): Observable<String> {
        const copy = this.convert(person);
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
        if (entity.dob) {
            entity.dob = new Date(entity.dob);
        }
    }

    private convert(person: Person): Person {
        const copy: Person = Object.assign({}, person);
        if (person.dob) {
            copy.dob = moment(person.dob).format('YYYY-MM-DD');
        }
        return copy;
    }
}

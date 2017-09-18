import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { PartyRole } from '../';
import { ResponseWrapper, createRequestOption } from '../../../shared';

import * as moment from 'moment';

@Injectable()
export class PartyRoleService {

    private resourceUrl = 'api/party-roles';
    private resourceSearchUrl = 'api/_search/party-roles';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(partyRole: PartyRole): Observable<PartyRole> {
        const copy = this.convert(partyRole);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(partyRole: PartyRole): Observable<PartyRole> {
        const copy = this.convert(partyRole);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: any): Observable<PartyRole> {
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

    changeStatus(partyRole: PartyRole, id: Number): Observable<ResponseWrapper> {
        const copy = this.convert(partyRole);
        return this.http.post(`${this.resourceUrl}/set-status/${id}`, copy)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id?: any): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    executeProcess(partyRole: any): Observable<String> {
        const copy = this.convert(partyRole);
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

    private convert(partyRole: PartyRole): PartyRole {
        const copy: PartyRole = Object.assign({}, partyRole);

        // copy.dateRegister = this.dateUtils.toDate(partyRole.dateRegister);

        // copy.dateFrom = this.dateUtils.toDate(partyRole.dateFrom);

        // copy.dateThru = this.dateUtils.toDate(partyRole.dateThru);
        return copy;
    }
}

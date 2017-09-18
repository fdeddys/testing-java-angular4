import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Organization } from '../';
import { OrganizationService } from '../';

@Component({
    selector: 'jhi-organization-view',
    templateUrl: './organization-view.component.html'
})
export class OrganizationViewComponent implements OnInit, OnDestroy, OnChanges {

    @Input() organization: Organization = new Organization();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['organization']) {
        }
    }

    ngOnDestroy() {
    }

}

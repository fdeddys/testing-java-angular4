import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Person } from '../';
import { PersonService } from '../';

@Component({
    selector: 'jhi-person-view',
    templateUrl: './person-view.component.html'
})
export class PersonViewComponent implements OnInit, OnDestroy, OnChanges {

    @Input() person: Person = new Person();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['person']) {
        }
    }

    ngOnDestroy() {
    }

}

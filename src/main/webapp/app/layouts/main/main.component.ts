import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized} from '@angular/router';
import {Message} from 'primeng/primeng';

import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper, Principal, ToasterService} from '../../shared';
import {ProfileService} from '../profiles/profile.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit, AfterViewInit {
    objToaster: Message[] = [];
    inProduction: boolean;
    swaggerEnabled: boolean;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private principal: Principal,
        private profileService: ProfileService,
        private toasterService: ToasterService
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'coreApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    ngAfterViewInit() {
        this.toasterService.toasterStatus.subscribe((val: Message) => {
            if (val) {
                this.objToaster.push(val);
                this.objToaster = [... this.objToaster];
            }
        });
    }
}

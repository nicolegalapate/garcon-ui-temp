import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { GlobalComponent } from 'app/global.component';
import { IpService } from 'app/services/ip.service';
import { OrderService } from 'app/services/order.service';
import { OrderDetailService } from 'app/services/orderdetail.service';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import { filter, Subscription } from 'rxjs';
import { response } from 'express';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public customerCart = GlobalComponent.customerCart;
    private ipAddress: any;
    private orderRequest: any;
    public href: string = '';
    @Output() orderPlaced:any;

    constructor(
        public location: Location, 
        private router: Router, 
        private ipService: IpService, 
        private orderService: OrderService, 
        private orderDetailService: OrderDetailService,
        ) { }

    ngOnInit() {
        
        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function

            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        const window_width = $(window).width();
        let $sidebar = $('.sidebar');
        let $sidebar_responsive = $('body > .navbar-collapse');
        let $sidebar_img_container = $sidebar.find('.sidebar-background');


        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function (event) {
            // click on switch, stop propagation of the event, so the dropdown will not be hidden, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function () {
            let $full_page_background = $('.full-page-background');


            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            if ($sidebar.length !== 0) {
                $sidebar.attr('data-color', new_color);
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function () {
            let $full_page_background = $('.full-page-background');

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');


            var new_image = $(this).find("img").attr('src');

            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeOut('fast', function () {
                    $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn('fast');
                });
            }

            if ($full_page_background.length != 0) {

                $full_page_background.fadeOut('fast', function () {
                    $full_page_background.css('background-image', 'url("' + new_image + '")');
                    $full_page_background.fadeIn('fast');
                });
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
            }
        });
    }


    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    decrementItem(id) {
        let check = GlobalComponent.customerCart.find(x => x.menuId === id);
        if (check) {
            let idx = GlobalComponent.customerCart.indexOf(check);
            let foodItem = {
                menuId: id,
                name: check.name,
                quantity: check.quantity - 1
            }
            if (foodItem.quantity == 0) {
                GlobalComponent.customerCart.splice(idx, 1);
            } else {
                GlobalComponent.customerCart[idx] = foodItem;
            }

        }
    }

    incrementItem(id) {
        let check = GlobalComponent.customerCart.find(x => x.menuId === id);
        if (check) {
            let idx = GlobalComponent.customerCart.indexOf(check);
            let foodItem = {
                menuId: id,
                name: check.name,
                quantity: check.quantity + 1
            }
            if (foodItem.quantity == 0) {
                GlobalComponent.customerCart.splice(idx, 1);
            } else {
                GlobalComponent.customerCart[idx] = foodItem;
            }
        }
    }

    createOrder() {
        //get ip address 
         
         this.ipService.getIpAddress().subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            this.ipAddress = res.ip;
            console.log(this.ipAddress);

            this.orderRequest = {
                "customerNumber": this.ipAddress,
                "status": 0,
                "dateCreated": new Date()
            }
            this.orderService.addOrder(this.orderRequest).subscribe(res => {
                let r = JSON.parse(JSON.stringify(res));
                console.log("r " + r);
                GlobalComponent.orderId = r.id;
                console.log("here in order service order id: " + GlobalComponent.orderId);

                GlobalComponent.customerCart.forEach((item) => {
                    var orderItem = {
                        "orderId": GlobalComponent.orderId,
                        "menuId": item.menuId,
                        "quantity": item.quantity,
                        "status": 0,
                        "dateModified": new Date(),
                        "dateCreated": new Date()
                    };
                    this.orderDetailService.submitOrderDetail(orderItem).subscribe(res => {
                        console.log(res);
                    })
                    GlobalComponent.orderDetails.push(orderItem);
                    //var idx = GlobalComponent.customerCart.indexOf(item);
                    //GlobalComponent.customerCart.splice(idx, 1);
                });
                this.isVisible();
                //GlobalComponent.href = '/table-list';
            });

        });
        
    }

    isVisible(){
        // return false;
        this.href = this.router.url;
        if(this.href=='/table-list') return false; 
        return true;
    }
}

import { Component, OnInit, DoCheck, Input, SimpleChanges } from '@angular/core';
import { GlobalComponent } from 'app/global.component';
import { OrderDetailService } from 'app/services/orderdetail.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
  constructor(private orderDetailService: OrderDetailService, private router: Router) { }
  public orderDetails: any;
  public href: string = '';
  subscription: Subscription;
  ngOnInit() {
    
    
  }


  ngAfterViewInit(){
    if(GlobalComponent.orderId!=''){
      this.getOrders();
    }
  }
  reloadPage() {

  }
  getOrders() {
    //var oid = '71E6A811-4199-4133-9D31-1DAF4FD8AF25'
    console.log(GlobalComponent.orderId);
    this.orderDetailService.getOrderDetails(GlobalComponent.orderId).subscribe(response => {
      GlobalComponent.customerOrders = response;
      this.orderDetails = GlobalComponent.customerOrders;
    });

  }



}

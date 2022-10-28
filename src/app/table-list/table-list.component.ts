import { Component, OnInit, DoCheck, Input, SimpleChanges } from '@angular/core';
import { GlobalComponent } from 'app/global.component';
import { OrderDetailService } from 'app/services/orderdetail.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { OrderService } from 'app/services/order.service';
import { PaymentTransactionService } from 'app/services/paymentTransaction.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(
    private orderDetailService: OrderDetailService,
    private orderService: OrderService,
    private paymentTransactionService: PaymentTransactionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  public orderDetails: any;
  public href: string = '';
  public billoutDetails: any;
  
  public paymentAmount;
  subscription: Subscription;
  public paymentForm;


  ngOnInit() {
    this.billOut(0);
    this.paymentForm = this.formBuilder.group({
      Amount: 0
    })
    this.hasBilledOut(false);

  }

  ngAfterViewInit() {
    if (GlobalComponent.orderId != '') {
      this.getOrders();
    }
  }

  hasBilledOut(x){
    return x;
  }
  getOrders() {
    //var oid = '71E6A811-4199-4133-9D31-1DAF4FD8AF25'
    //console.log(GlobalComponent.orderId);
    this.orderDetailService.getOrderDetails(GlobalComponent.orderId).subscribe(response => {
      GlobalComponent.customerOrders = response;
      this.orderDetails = GlobalComponent.customerOrders;


      console.log(response);
    });

  }
  processPayment() {
    if (this.paymentAmount < this.billoutDetails.finalBill) {
      alert("Invalid amount!");
    } 
    else {
      var billOutReq = {
        "orderId": GlobalComponent.orderId,
        "totalCharge": this.billoutDetails.finalBill,
        "paymentAmount": Number(this.paymentAmount),
        "paymentDate": new Date(),
        "inclusiveTax": this.billoutDetails.inclusiveTax,
        "serviceCharge": this.billoutDetails.serviceCharge
      }
      
      this.paymentTransactionService.postPayment(billOutReq).subscribe({
        next: (res) => {
          console.log(res)
          //update order status to completed
          var updateStatus = {
            "id": GlobalComponent.orderId,
            "status": 1
          }
          this.orderService.updateOrderStatus(updateStatus).subscribe(response => console.log(response));
          alert('Your bill has been paid! Thank for dining with us. You will now be redirected back to Menu page!');
          this.router.navigate(['/', 'dashboard'])
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }


onKey(event: any) { // without type info
  this.paymentAmount = event.target.value;
}



payBill(): void {
  console.log(document.getElementById('Amount').nodeValue)
    console.log(this.paymentForm.value);
}


billOut(paymentAmt){
  this.hasBilledOut(true);
  this.orderService.getOrderById(GlobalComponent.orderId).subscribe(response => {
    this.billoutDetails = response;
    console.log(this.billoutDetails)

  })



}

}

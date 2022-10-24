import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/services/menu.service';
import * as Chartist from 'chartist';
import { analytics } from 'googleapis/build/src/apis/analytics';
import * as internal from 'stream';
import { HttpClient } from '@angular/common/http';
import { IpService } from 'app/services/ip.service';
import { OrderService } from 'app/services/order.service';
import { GlobalComponent } from 'app/global.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private menuService: MenuService, private ipService: IpService, private orderService: OrderService) { }

  allMenuItems: any;
  appetizerItems: any;
  mainCourseItems: any;
  dessertItems: any;
  drinkItems: any;
  tempQty = 0;
  value: any = 0;
  selectedItem: any;
  clientIp: any;
  customerCart: any = [];

  ngOnInit() {
    this.populateMenuItems();
    //this.createOrder();
  }


  createOrder(){
    this.ipService.getIpAddress().subscribe(response => {
      let res = JSON.parse(JSON.stringify(response));
      this.clientIp = res.ip.ip;
      var req = {
        "customerNumber": this.clientIp,
        "status": 0, 
        "dateCreated": new Date()
      };
      console.log(req);
      this.orderService.addOrder(req).subscribe(response => {
        console.log(response)
      })
    });
  }
  populateMenuItems() {
    this.menuService.getMenus().subscribe(response => {
      this.allMenuItems = response;
      
      //this.initializeQuantities();
      if (this.allMenuItems != null) {
        console.log(this.allMenuItems);
        this.appetizerItems = this.allMenuItems.filter((obj) => {
          return obj.menuCategory === 0;
        });

        this.mainCourseItems = this.allMenuItems.filter((obj) => {
          return obj.menuCategory === 1;
        });

        this.dessertItems = this.allMenuItems.filter((obj) => {
          return obj.menuCategory === 2;
        });

        this.drinkItems = this.allMenuItems.filter((obj) => {
          return obj.menuCategory === 3;
        });
      }
    });
    return;
  }

  setQty(menuId){
    return this.selectedItem = this.allMenuItems.find(x => x.id === menuId)
  }

  addToCart(id, n, qty){
    let foodItem = {
      menuId: id,
      name: n,
      quantity: qty
    }
    var check = GlobalComponent.customerCart.find(x=> x.menuId === id)
    if(check){
      console.log(check)
      console.log(GlobalComponent.customerCart);
      let idx = GlobalComponent.customerCart.indexOf(check);
      console.log(idx)
      let foodItem = {
        menuId: id,
        name: n, 
        quantity: check.quantity + qty
      }
      GlobalComponent.customerCart[idx] = foodItem;
    } 
    else {
      GlobalComponent.customerCart.push(foodItem);
    }
    
    console.log(GlobalComponent.customerCart);
    this.value = 0;
  }

  getQuantity(id){
    let check = GlobalComponent.customerCart.find(x=> x.menuId ===id);
    return check.quantity;
  }

  handleMinus(){
    if(this.value > 0){
      this.value--;
    }
  }

  handlePlus(){
    this.value++;
  }

  
}

import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/services/menu.service';
import { GlobalComponent } from 'app/global.component';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  constructor(private menuService: MenuService) { }
  allMenuItems: any;
  chefRecommendedItems: any;
  appetizerItems: any;
  mainCourseItems: any;
  dessertItems: any;
  drinkItems: any;
  value: any;

  ngOnInit(): void {
    this.populateMenuItems();
  }

  populateMenuItems(){
    this.menuService.getMenus().subscribe(response => {
      this.allMenuItems = response;
      if(this.allMenuItems != null){
        
        this.chefRecommendedItems = this.allMenuItems.filter((obj) => {
          return obj.isRecommended == true;
        });

        this.appetizerItems = this.chefRecommendedItems.filter((obj) => {
          return obj.menuCategory === 0;
        });
        
        this.mainCourseItems = this.chefRecommendedItems.filter((obj) => {
          return obj.menuCategory === 1;
        });

        this.dessertItems = this.chefRecommendedItems.filter((obj) => {
          return obj.menuCategory === 2;
        });

        this.drinkItems = this.chefRecommendedItems.filter((obj) => {
          return obj.menuCategory === 3;
        });
      }
    });
    return;
  }

  addChefRecommended(){
    this.appetizerItems.forEach((obj) => {
      let check = GlobalComponent.customerCart.find(x => x.menuId === obj.id);
      if (check) { //exists in cart
        let idx = GlobalComponent.customerCart.indexOf(check);
        let foodItem = {
          menuId: obj.id,
          name: check.name,
          quantity: check.quantity + 1
        }
        if (foodItem.quantity == 0) {
          GlobalComponent.customerCart.splice(idx, 1);
        } 
        else {
          GlobalComponent.customerCart[idx] = foodItem;
        }
      } else {
        GlobalComponent.customerCart.push({menuId: obj.id, name: obj.name, quantity: 1});
      }
    });

    this.mainCourseItems.forEach((obj) => {
      let check = GlobalComponent.customerCart.find(x => x.menuId === obj.id);
      if (check) { //exists in cart
        let idx = GlobalComponent.customerCart.indexOf(check);
        let foodItem = {
          menuId: obj.id,
          name: check.name,
          quantity: check.quantity + 1
        }
        if (foodItem.quantity == 0) {
          GlobalComponent.customerCart.splice(idx, 1);
        } 
        else {
          GlobalComponent.customerCart[idx] = foodItem;
        }
      } else {
        GlobalComponent.customerCart.push({menuId: obj.id, name: obj.name, quantity: 1});
      }
    });

    this.dessertItems.forEach((obj) => {
      let check = GlobalComponent.customerCart.find(x => x.menuId === obj.id);
      if (check) { //exists in cart
        let idx = GlobalComponent.customerCart.indexOf(check);
        let foodItem = {
          menuId: obj.id,
          name: check.name,
          quantity: check.quantity + 1
        }
        if (foodItem.quantity == 0) {
          GlobalComponent.customerCart.splice(idx, 1);
        } 
        else {
          GlobalComponent.customerCart[idx] = foodItem;
        }
      } else {
        GlobalComponent.customerCart.push({menuId: obj.id, name: obj.name, quantity: 1});
      }
    });
    
    this.drinkItems.forEach((obj) => {
      let check = GlobalComponent.customerCart.find(x => x.menuId === obj.id);
      if (check) { //exists in cart
        let idx = GlobalComponent.customerCart.indexOf(check);
        let foodItem = {
          menuId: obj.id,
          name: check.name,
          quantity: check.quantity + 1
        }
        if (foodItem.quantity == 0) {
          GlobalComponent.customerCart.splice(idx, 1);
        } 
        else {
          GlobalComponent.customerCart[idx] = foodItem;
        }
      } else {
        GlobalComponent.customerCart.push({menuId: obj.id, name: obj.name, quantity: 1});
      }
    });
    
    console.log(GlobalComponent.customerCart);
  }
}

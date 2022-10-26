import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';
import { GlobalComponent } from 'app/global.component';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private url = 'https://localhost:7130/api/Order';
    private getOrder = 'https://localhost:7130/api/Order/Customer/';

    constructor(private httpClient:HttpClient){ }
    
    //add order
    addOrder(req){
        let req_json = JSON.parse(JSON.stringify(req));
        
        return this.httpClient.post(this.url, req_json);
    }

    //getOrderByCustomerNbr
    getOrderbyCustomerNbr(req){
        return this.httpClient.get(this.getOrder + req)
    }
}
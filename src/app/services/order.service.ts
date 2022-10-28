import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';
import { GlobalComponent } from 'app/global.component';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private url = 'https://localhost:7246/api/Order';
    private getOrder = 'https://localhost:7246/api/Order/id?id=';
    private updateStatus = 'https://localhost:7246/api/Order/Status';
    private options;
    constructor(private httpClient:HttpClient){ }

    addOrder(req){
        let req_json = JSON.parse(JSON.stringify(req));
        return this.httpClient.post(this.url, req_json);
    }

    getOrderById(id){
        return this.httpClient.get(this.getOrder + id);
    }
    //getOrderByCustomerNbr
    getOrderbyCustomerNbr(req){
        return this.httpClient.get(this.getOrder + req)
    }

    updateOrderStatus(req){
        let req_json = JSON.parse(JSON.stringify(req))
        return this.httpClient.put(this.updateStatus, req);
    }
}
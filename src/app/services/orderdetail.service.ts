import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';
import { GlobalComponent } from 'app/global.component';

@Injectable({
    providedIn: 'root'
})

export class OrderDetailService {
    private url = 'https://localhost:7246/api/OrderDetail';
    private geturl = 'https://localhost:7246/api/OrderDetail/orderId?orderId='
    private updateStatusUrl = 'https://localhost:7246/api/OrderDetail/Status'
    constructor(private httpClient:HttpClient){ }
    
    //add order
    submitOrderDetail(req){
        let req_json = JSON.parse(JSON.stringify(req));
        return this.httpClient.post(this.url, req_json);
    }

    //getOrderDetails
    getOrderDetails(id){
        console.log(this.geturl + id);
        return this.httpClient.get(this.geturl+id);
        
    }

    updateOrderDetailStatus(req){
        let req_json = JSON.parse(JSON.stringify(req));
        return this.httpClient.put(this.updateStatusUrl, req_json);
    }
}

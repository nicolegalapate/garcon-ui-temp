import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';
import { GlobalComponent } from 'app/global.component';

@Injectable({
    providedIn: 'root'
})

export class OrderDetailService {
    private url = 'https://localhost:7130/api/OrderDetail';
    private geturl = 'https://localhost:7130/api/OrderDetail/id?orderId='
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
}

import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private url = 'https://localhost:7130/api/Order';

    constructor(private httpClient:HttpClient){ }
    
    //add order
    addOrder(req){
        
        let req_json = JSON.parse(JSON.stringify(req));
        return this.httpClient.post(this.url, req_json);
    }
}
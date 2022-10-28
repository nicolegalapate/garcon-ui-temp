import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';
import { GlobalComponent } from 'app/global.component';

@Injectable({
    providedIn: 'root'
})

export class PaymentTransactionService{
    private url = 'https://localhost:7246/api/PaymentTransaction';

    constructor(private httpClient:HttpClient){ }

    postPayment(req){
        var req_json = JSON.parse(JSON.stringify(req));
        console.log(req);
        return this.httpClient.post(this.url,req_json);
    }
}


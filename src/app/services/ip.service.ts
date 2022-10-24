import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class IpService {
    private url = 'https://ip.nf/me.json';

    constructor(private httpClient:HttpClient){ }
    getIpAddress(){
        let res = this.httpClient.get(this.url);        
        return res;
    }
}
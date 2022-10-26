import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class IpService {
    private url = 'http://api.ipify.org/?format=json';

    constructor(private httpClient:HttpClient){ }
    getIpAddress(){
        return this.httpClient.get(this.url);
    }
}
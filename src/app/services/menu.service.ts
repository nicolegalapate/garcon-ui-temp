import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit} from '@angular/core';
import { GlobalComponent } from 'app/global.component';

@Injectable({
    providedIn: 'root'
})

export class MenuService {
    private url = 'https://localhost:7246/api/Menu';

    constructor(private httpClient:HttpClient){ }
    getMenus(){
        return this.httpClient.get(this.url);
    }
}
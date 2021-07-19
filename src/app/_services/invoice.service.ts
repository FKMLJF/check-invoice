import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl+'/';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getDashboardContent(search:string = ''): Observable<any> {
    return this.http.post(API_URL + 'dashboard', { responseType: 'text', search : search });
  }

  postPaid(id: string): Observable<any> {
    return this.http.post(API_URL + 'paid', { responseType: 'text', id: id });
  }
}

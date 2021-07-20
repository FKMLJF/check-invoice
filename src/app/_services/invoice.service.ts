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

  getDashboardContent(column:string="",search:string = ''): Observable<any> {
    return this.http.post(API_URL + 'getdashboard', {  search : search, column:column });
  }

  postPaid(id: string): Observable<any> {
    return this.http.post(API_URL + 'paid', {  id: id });
  }

  postNewInvoice(data: any): Observable<any> {
    return this.http.post(API_URL + 'invoice', data );
  }

  updateInvoice(data: any, id: string): Observable<any> {
    return this.http.put(API_URL + 'invoice/'+id, data );
  }


  getInvoiceById(id: string): Observable<any> {
    return this.http.get(API_URL + 'invoice/'+id, { });
  }
  deleteInvoiceById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'invoice/'+id, { });
  }
}

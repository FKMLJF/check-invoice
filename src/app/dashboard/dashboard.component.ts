import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../_services/invoice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private invoiceService: InvoiceService, private router: Router) { }
  data : any;
  allDebit = "";
  allReceivables = "";
  searchText = "";
  loading = true;
  column= "buyerName"

  paidChecked = false;

  ngOnInit(): void {
   this.loadData();
  }

  public loadData(search:string="", column:string=""){
    this.loading = true;
    this.invoiceService.getDashboardContent(column,search).subscribe(
      data => {
        this.data = data.invoices
        this.allDebit = data.allDebit
        this.allReceivables = data.allReceivables
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  public paid(id:string){
      this.invoiceService.postPaid(id).subscribe(
        data => {
          this.loadData();
          this.paidChecked = true;
          setTimeout( () => {
            this.paidChecked = false;
          },3000);
        },
        err => {
          console.log(err)
        }
      );
  }

  handleChange(event:any) : void {
    this.column = event.target.value;
  }

  handleOnkeyDown(event:any){
    if (event.key === "Enter") {
      this.loadData(this.searchText, this.column);
    }
  }

  handleSearch(){
    this.loadData(this.searchText,this.column);
  }

  handlOnSearch(){
    if(this.searchText == ""){
      this.loadData(this.searchText, this.column);
    }
  }

  handleEdit(id: any){
    return this.router.navigate(['create-invoice', id])
  }

  handleDelete(id: any){
    return this.router.navigate(['delete-invoice', id])
  }

}

import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../_services/invoice.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private invoiceService: InvoiceService) { }
  data : any;
  allDebit = "";
  allReceivables = "";
  searchText = "";
  paidChecked = false;

  ngOnInit(): void {
   this.loadData();
  }

  public loadData(search:string=""){
    this.invoiceService.getDashboardContent(search).subscribe(
      data => {
        this.data = data.invoices
        this.allDebit = data.allDebit
        this.allReceivables = data.allReceivables
      },
      err => {
        console.log(err)
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

  handleOnkeyDown(event:any){
    if (event.key === "Enter") {
      this.loadData(this.searchText);
    }
  }

  handleSearch(){
    this.loadData(this.searchText);
  }

  handlOnSearch(){
    if(this.searchText == ""){
      this.loadData(this.searchText);
    }
  }

}

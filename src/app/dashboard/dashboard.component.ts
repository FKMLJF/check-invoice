import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../_services/invoice.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService .getDashboardContent().subscribe(
      data => {
       console.log(data)
      },
      err => {
        console.log(err)
      }
    );
  }

}

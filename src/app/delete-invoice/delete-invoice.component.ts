import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../_services/invoice.service";

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css']
})
export class DeleteInvoiceComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private router: Router, private invoiceService : InvoiceService) { }
  id : string  = ''

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
  }

  delete(): void{
    this.invoiceService.deleteInvoiceById(this.id).subscribe(
      data => {
        this.router.navigate(['/dashboard'])
      },
      error =>{
        console.error(error);
      }
    )
  }

  Cancel(): void{
    this.router.navigate(['/dashboard'])
  }

}

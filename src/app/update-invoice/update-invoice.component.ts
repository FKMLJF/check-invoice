import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../_services/invoice.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private invoiceService : InvoiceService,private formBuilder: FormBuilder, private router: Router) { }
  id : string  = ''
  // @ts-ignore
  updateInvoice : FormGroup;
  submitted = false;
  disabled='';
  errors='';
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;

    this.invoiceService.getInvoiceById(this.id).subscribe(
      data => {
            this.updateInvoice = this.formBuilder.group({
              invoiceNumber: [data.invoiceNumber, [Validators.required]],
              sellerName: [data.sellerName, [Validators.required]],
              sellerTaxNumber: [data.sellerTaxNumber, [Validators.required]],
              buyerName: [data.buyerName, [Validators.required]],
              buyerTaxNumber: [data.buyerTaxNumber, [Validators.required]],
              paymentDue: [data.paymentDue.substr(0,10), [Validators.required]],
              grossTotal: [data.grossTotal, [Validators.required]],
              invoicesType: [data.invoicesType, [Validators.required]],
              createdAt: [data.createdAt.substr(0,10), [Validators.required]],
              id: [data.id, [Validators.required]]
            });
      },
      error =>{
        console.error(error);
      }
    )
  }


  get f(): { [key: string]: AbstractControl } {
    return this.updateInvoice.controls;
  }

  onSubmit(): void{
    this.submitted = true;

    if (this.updateInvoice.invalid) {
      return;
    }
    this.disabled = "disabled";
    this.invoiceService.updateInvoice(this.updateInvoice.value, this.id).subscribe(
      data => {
        this.router.navigate(['/dashboard'])
        this.disabled = "";
      },
      error =>{
        console.error(error.errors);
        this.disabled = "";
        this.errors = error.errors;
      }
    )
  }


}

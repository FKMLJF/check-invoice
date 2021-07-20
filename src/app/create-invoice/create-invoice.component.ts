import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {InvoiceService} from "../_services/invoice.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  // @ts-ignore
  createInvoice : FormGroup;
  submitted = false;
  errors = "";
  disabled: string ="";


  constructor(private formBuilder: FormBuilder, private invoiceService: InvoiceService,private router: Router) {
  }

  ngOnInit(): void {
    this.createInvoice = this.formBuilder.group({
      invoiceNumber: ['', [Validators.required]],
      sellerName: ['', [Validators.required]],
      sellerTaxNumber: ['', [Validators.required]],
      buyerName: ['', [Validators.required]],
      buyerTaxNumber: ['', [Validators.required]],
      paymentDue: ['', [Validators.required]],
      grossTotal: ['', [Validators.required]],
      createdAt: ['', [Validators.required]],
      invoicesType: ['', [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createInvoice.controls;
  }

  onSubmit(): void{
    this.submitted = true;

    if (this.createInvoice.invalid) {
      return;
    }
    this.invoiceService.postNewInvoice(this.createInvoice.value).subscribe(
      data => {
        this.router.navigate(['/dashboard'])
    },
    error =>{
        console.error(error.errors);
      this.errors = error.errors;
    }
    )
  }

  onReset(): void {
    this.submitted = false;
    this.createInvoice.reset();
  }
}

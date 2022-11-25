import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  
  constructor(private cmnSrv: CommonService) { }

  createOrder(data:any): any {
    let formData:any = new FormData()
    formData.append('first_name', data.form.first_name  || '')
    formData.append('last_name', data.form.last_name  || '')
    formData.append('email', data.form.email  || '')
    formData.append('address_1', data.form.address_1  || '')
    formData.append('city', data.form.city  || '')
    formData.append('state', data.form.state  || '')
    formData.append('postcode', data.form.postcode  || '')
    formData.append('country', data.form.country  || '')
    formData.append('product_id', data.product_id  || '')
    formData.append('qty', data.qty  || '')
    formData.append('paymentId', data.paymentId || "")
    formData.append('paymentStatus', data.paymentStatus || "")
    formData.append('variation', data.data?.isWholeSaleChecked  || "")
    formData.append('checkIsWholeSale', data.data.checkIsWholeSale || "")
    formData.append('full_name', data.data.checkWholeSaleForm.full_name || "")
    formData.append('company_name', data.data.checkWholeSaleForm.company_name || "")
    formData.append('tax_no', data.data.checkWholeSaleForm.tax_no || "")
    formData.append('company_email', data.data.checkWholeSaleForm.company_email || "")

    
  let body ={
    formData
  }
    return this.cmnSrv.post('create_order', formData, {}, false, false, false).pipe(map((response) => {
        return response
    }))
   
  }

  getProductByOrderid(order_id:number): any {
    let body={
      order_id
     }
     CommonService
     return this.cmnSrv.get(`get_order_detail?order_id=${order_id}`).pipe(map((response) => {
         return response.data
     }));
   }

 
}

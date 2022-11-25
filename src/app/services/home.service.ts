import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  
  constructor(private cmnSrv: CommonService) { }
   
  fetchProducts(): any {
    CommonService
    return this.cmnSrv.get('products/').pipe(map((response) => {
        return response.data
    }));
  }

  getProductById(id:number): any {
   let body={
        id
    }
    CommonService
    return this.cmnSrv.get(`get_product_by_id?id=${id}`).pipe(map((response) => {
        return response.data
    }));
  }

 
}

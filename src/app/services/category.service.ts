import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private cmnSrv: CommonService) { }

  fetchCategoryWiseProduct(): any {
    CommonService
    return this.cmnSrv.get('get_category_wise_product/').pipe(map((response) => {
        return response.data
    }));
  }
  fetchFiltesr(): any {
    CommonService
    return this.cmnSrv.get('filters/').pipe(map((response) => {
        return response.data
    }));
  }
  filterWiseProduct(catrgy_id:any,metal:any,style:any,min:any,max:any,clearAll:string): any {
    CommonService
    return this.cmnSrv.get(`filter_wise_product?category_id=${catrgy_id}&metal=${metal}&style=${style}&min=${min}&max=${max}&clearAll=${clearAll}`).pipe(map((response) => {
        return response.data
    }));
  }
}

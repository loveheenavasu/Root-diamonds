import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as internal from "stream";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private cmnSrv: CommonService) {}

  fetchCategoryWiseProduct(): any {
    CommonService;
    return this.cmnSrv.get("get_category_wise_product/").pipe(
      map((response) => {
        return response.data;
      })
    );
  }
  fetchFiltesr(): any {
    CommonService;
    return this.cmnSrv.get("filters/").pipe(
      map((response) => {
        return response.data;
      })
    );
  }
  filterWiseProduct(
    catrgy_id: any,
    metal: any,
    style: any,
    min: any,
    max: any,
    clearAll: string,
    limit: string,
    carat: string,
    clarity: string,
    color: string,
    cut: string,
    shape: string
  ): any {
    CommonService;
    return this.cmnSrv
      .get(
        `filter_wise_product?category_id=${catrgy_id}&metal=${metal}&style=${style}&min=${min}&max=${max}&clearAll=${clearAll}&limit=${limit}&carat=${carat}&clarity=${clarity}&cut=${cut}&shape=${shape}&color=${color}`
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}

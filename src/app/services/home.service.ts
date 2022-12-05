import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CommonService } from "./common.service";

export type shareMemoriesData = {
  first_name: string;
  last_name: string;
  email: string;
  landowner_img: string;
  productSKU: string;
  landowner_name: string;
  landowner_origin: string;
  landowner_description: string;
};

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private cmnSrv: CommonService) {}

  fetchProducts(): any {
    CommonService;
    return this.cmnSrv.get("products/").pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getProductById(id: number): any {
    CommonService;
    return this.cmnSrv.get(`get_product_by_id?id=${id}`).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getProductBysku(proSku: string): any {
    CommonService;
    return this.cmnSrv.get(`get_product_by_sku?sku=${proSku}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  postShareMemories(data: shareMemoriesData): any {
    return this.cmnSrv.post("save_memories", data).pipe(
      map((response) => {
        return response;
      })
    );
  }
}

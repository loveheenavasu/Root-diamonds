import { Component } from "@angular/core";
import { CheckoutService } from "src/app/services/checkout.service";
import { Params, Router } from "@angular/router";

@Component({
  selector: "app-order_success",
  templateUrl: "./order_success.component.html",
  styleUrls: ["./order_success.component.scss"],
})
export class Order_successComponent {
  title = "order_success";
  idFromUrl: any = {};
  checkoutProduct: any = {};
  constructor(private router: Router, private checkoutSrv: CheckoutService) {}

  ngOnInit() {
    //  this.router.queryParams.subscribe((params : any) => {
    //   console.log(params,'sdsdsd')
    //   this.idFromUrl = idFromUrl
    // });
    let url: any = window.location.href.split("/")[4];

    this.checkoutSrv.getProductByOrderid(url).subscribe((data: any) => {
      this.checkoutProduct = data;
    });
  }
}

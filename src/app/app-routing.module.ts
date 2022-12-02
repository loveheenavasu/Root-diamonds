import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CategoryComponent } from "./pages/category/category.component";
import { MoneyGoesComponent } from "./pages/money-goes/money-goes.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { Order_successComponent } from "./pages/order_success/order_success.component";
import { ContactComponent } from "./pages/contact/contact.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "where-your-money-goes", component: MoneyGoesComponent },
  { path: "checkout/:id", component: CheckoutComponent },
  { path: "order_success/:id", component: Order_successComponent },
  { path: "category/:id/:id1", component: CategoryComponent },
  { path: "contact", component: ContactComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

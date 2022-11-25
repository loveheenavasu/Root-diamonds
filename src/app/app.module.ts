import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonComponent } from './models/common/common.component';
import { HomeComponent } from './pages/home/home.component';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'; 
import { SignInComponent } from './models/sign-in/sign-in.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './pages/category/category.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoneyGoesComponent } from './pages/money-goes/money-goes.component';
import { NzProgressModule } from 'ng-zorro-antd/progress'; 
import { NzRadioModule } from 'ng-zorro-antd/radio'; 
import { NzStepsModule } from 'ng-zorro-antd/steps';  
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgChartsModule } from 'ng2-charts';  
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CheckoutComponent } from './pages/checkout/checkout.component';  
import { Order_successComponent } from './pages/order_success/order_success.component';  
import { NgxPayPalModule } from 'ngx-paypal';
// import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CommonComponent,
    HomeComponent,  
    SignInComponent,
    CategoryComponent,
    MoneyGoesComponent,  
    CheckoutComponent,
    Order_successComponent,
  ],
  imports: [
    NgxPayPalModule,
    // NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NzButtonModule,
    NzTabsModule,
    SlickCarouselModule,
    NzAvatarModule,
    NzDrawerModule,
    NzMenuModule,
    NzModalModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzCheckboxModule,
    NzUploadModule,
    NzImageModule,
    NzCollapseModule,
    NzSliderModule,
    NzProgressModule,
    NzRadioModule,
    NzIconModule,
    NzInputNumberModule,
    NzStepsModule, 
    NzSelectModule,
    NzTableModule,
    NgChartsModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

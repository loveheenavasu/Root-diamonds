import { Component, ElementRef, Inject,Renderer2,OnInit ,ViewChild, NgModule} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Params ,Router, ActivatedRoute,NavigationEnd} from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { DOCUMENT } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
import { Location } from '@angular/common'
import {
  IPayPalConfig,
  ICreateOrderRequest, 
  NgxPayPalModule
} from 'ngx-paypal';

declare var paypal: any;
@Component({
  selector: 'app-cart',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent{
  public payPalConfig ? : IPayPalConfig;
  @ViewChild("paypal", { static: true }) paypalElement: ElementRef | any;
    title = 'checkout';
    checkForm!: FormGroup;
    first_name: FormControl = new FormControl('', Validators.required);
    last_name: FormControl = new FormControl;
    country:FormControl = new FormControl;
    address_1:FormControl = new FormControl;
    city:FormControl = new FormControl;
    state:FormControl = new FormControl;
    postcode:FormControl = new FormControl;
    email: FormControl = new FormControl;
    singleProduct: any = {} 
    paymentStatus :any ={}
    getIdFromUrl:number = 0
    isWholeSaleChecked:Boolean = false
    apiData :any ={}
    submitted = false
    checkUrl:boolean = false
    productPageLoading = false;

    constructor(private formBuilder : FormBuilder, private Activeroute: ActivatedRoute,private router: Router,private homesrv : HomeService,private checkoutSrv : CheckoutService ,  private _renderer2: Renderer2, @Inject(DOCUMENT) private document: Document, private location: Location) {
      this.checkForm = new FormGroup({
        first_name: this.first_name,
        last_name: this.last_name,
          country: this.country,
          address_1: this.address_1,
          city: this.city,
          state: this.state,
          postcode: this.postcode,
          email: this.email,
      });
    }

    ngOnInit() {

      window.scrollTo(0, 0)

     
      this.checkUrl = window.location.href.includes('/checkout') ? true : false
      let url :any =  window.location.href.split('/')[4]
       this.singleProduct = history.state.product
       let productItem :any = localStorage.getItem("product-item")
       this.apiData =  JSON.parse(productItem)
       this.isWholeSaleChecked = history.state.isWholeSaleChecked
      this.homesrv.getProductById(url).subscribe((data:any) => {
         this.singleProduct = data
      })
      this.checkForm = this.formBuilder.group({
        first_name : ['',Validators.required],
        last_name : ['',Validators.required],
        country : ['',Validators.required],
        address_1 : ['',Validators.required],
        city : ['',Validators.required],
        state : ['',Validators.required],
        postcode : ['',Validators.required],
        email : ['',Validators.required]
      })
      this.initConfig();
  }

  get f() { return this.checkForm.controls; }
  changeRoute(){
    // this.router.navigate([`/`])
    this.location.back() 
  }

  paypalConfig(){
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AZ3-HZ_XfEPn1ICOBkV8bhYfR81EckdSGMIfdTqO0D30JWMzuK4pAPvPXY6wwX0jYKAsUXlvYm0dnYcI',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: this.apiData.state?.wholeSalePrice,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: this.apiData.state?.wholeSalePrice
                      }
                  }
              },
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          actions.order.get().then((details:any) => {
            });

      },
      onClientAuthorization: (data) => {
        this.paymentStatus = data
       
        if(this.paymentStatus){
          this.onSubmitstatus()
        }
      },
  };
  }
  checkValidate(){
    if (this.checkForm.valid) {
      if(Object.keys(this.payPalConfig || {}).length > 0){
        return
      }
      
      this.paypalConfig()
    }
   
  }
  private initConfig(): void {
    this.submitted = true
    if (this.checkForm.invalid) {
       return
    }
    this.paypalConfig()
  }
    onSubmitstatus() {
     let data = {
     form:this.checkForm.value,
     product_id:this.apiData.state?.product?.id || this.apiData.state?.productId,
     qty:1,
     paymentId: this.paymentStatus.id,
     paymentStatus:this.paymentStatus.status,
     variation:this.isWholeSaleChecked,
     checkIsWholeSale:history.state,
     data:this.apiData.state
    }

   if(Object.keys(this.paymentStatus).length){
    this.productPageLoading = true
      this.checkoutSrv.createOrder(data).subscribe((res:any) => {
        if(res){
          this.productPageLoading = false
        this.router.navigateByUrl(`/order_success/${res?.data.item}`)
        localStorage.clear();
        }
      },
      ( error: any )=> {
        
      }
      )
    }
  }

  onSubmit(){
  }

  isVisible13 = false;
  isConfirmLoading13 = false;
  termPolicy(): void {
    setTimeout(() => {
      this.isVisible13 = true;
    }, 400); 
  } 
  handleCancel13(): void {
    this.isVisible13 = false;
  }
  

  isVisible14 = false;
  isConfirmLoading14 = false;
  returnPolicy(): void {
    setTimeout(() => {
      this.isVisible14 = true;
    }, 400); 
  } 
  handleCancel14(): void {
    this.isVisible14 = false;
  }
  
 
}

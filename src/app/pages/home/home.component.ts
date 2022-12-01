import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ɵROUTER_PROVIDERS } from "@angular/router";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { NzUploadChangeParam } from "ng-zorro-antd/upload";
import { CategoryService } from "src/app/services/category.service";
import { CheckoutService } from "src/app/services/checkout.service";
import { HomeService } from "src/app/services/home.service";
// import { NgxSpinnerService } from 'ngx-spinner';

type productModel = {
  id: number | undefined;
  image: string;
  isOpenOverlay: boolean | false;
  post_name: string;
  price: string;
  address: string;
  edition: string;
  owner_image: string;
  ownerThumb: string;
  owner_name: string;
  description: string;
  owner_thumbnail_image: string;
  stock: string;
  name: String;
  term_id: string;
};
type videoModal = {
  mime_type?: string;
  url?: string;
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  name = "Video events";

  @ViewChild("videoPlayer") videoplayer: any;
  checkWholeSaleForm: FormGroup;
  full_name: FormControl = new FormControl();
  company_name: FormControl = new FormControl();
  tax_no: FormControl = new FormControl();
  company_email: FormControl = new FormControl();
  classList: any;
  parentElement: any;
  loading = true;

  productList: any = []; //Array<productModel>   = [];
  productDetail: any = {};
  checkIsWholeSale: boolean = false;
  apiData: any = {};
  videoSource: videoModal = {
    mime_type: "",
    url: "",
  };
  shopAll: any = {};
  newPrice: number = 0;
  public startedPlay: boolean = false;
  public show: boolean = false;
  productPageLoading = false;
  tabCatName: string = "Polish";
  constructor(
    private router: Router,
    private homesrv: HomeService,
    private ctgysrv: CategoryService,
    private checkout: CheckoutService // private spinnerService: NgxSpinnerService
  ) {
    this.checkWholeSaleForm = new FormGroup({
      full_name: this.full_name,
      company_name: this.company_name,
      tax_no: this.tax_no,
      company_email: this.company_email,
    });
  }

  ngOnInit() {
    // this.homesrv.fetchProducts().subscribe((home:productModel[]) => {
    //   this.productList = home
    //   console.log(this.productList,'this.productListewew')
    // })
    this.fillWholeSaleForm = false;
    this.shopAll = {
      term_id: 38,
      name: "Shop all",
      slug: "/category/0/0",
      term_group: 0,
      term_taxonomy_id: 38,
      taxonomy: "product_cat",
      description: "",
      parent: 0,
      count: 6,
      filter: "raw",
      products: [
        {
          id: 417,
          name: "Testing Polish",
          is_variable: false,
          variable_description: "",
          sales_price_for_variation: "",
          wholesale_price_for_variation: "",
          p_description: "Polish desctiopm",
          price: "",
          whole_sale_price: "",
          image: null,
          gallery: null,
          owner_image: "",
          owner_thumbnail_image: "",
          owner_name: "",
          description: "",
          edition: "",
          address: "",
          Design: "",
          Stone: "",
          product_video: "",
          stock: "instock",
        },
      ],
    };
    this.ctgysrv
      .filterWiseProduct(0, "", "", "", "", "no", "15", "", "", "", "", "")
      .subscribe((data: any) => {
        this.productList = data;
        // console.log(this.productList, "this.pro");
        this.productList.push(this.shopAll);
        // this.spinnerService.show();
      });
    let productItem: any = localStorage.getItem("product-item");
    this.apiData = JSON.parse(productItem);
    const homeFixed: any = document.querySelector("body");
    homeFixed.classList.add("home");
    if (localStorage.getItem("scroll") === "1") {
      setTimeout(() => {
        let element: HTMLElement = document.querySelector(
          "#bottom-btn"
        ) as HTMLElement;
        element.click();
      }, 200);
      localStorage.setItem("scroll", "2");
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    }
    document.onreadystatechange = function () {
      if (document.readyState !== "complete") {
      } else {
        const bannerload: any = document.querySelector(".banner-text");
        bannerload.classList.add("in");
        setTimeout(() => {
          const shopAdd: any = document.querySelector(".cookie-policy");
          shopAdd.classList.add("in");
        }, 2000);
      }
    };

    // Scroll To Top ======================================

    // Gsap ===============================================
    gsap.registerPlugin(ScrollTrigger);
    this.initScrollTriggers();

    // Remove Class from Header  ==========================
    const headerClass: any = document.querySelector("header");
    headerClass.classList.remove("shop-page");
    const headerClass2: any = document.querySelector("header");
    headerClass2.classList.remove("changed");
    // setTimeout(() => {
    // }, 5000);
  }

  openLink(categoryName: string) {
    this.tabCatName = categoryName;
    if (categoryName === "Shop all") {
      localStorage.setItem("activeCatTab", this.tabCatName);
      this.router.navigateByUrl("/category/0/0");
    }
  }
  // getfilterWiseProduct(id:any){
  //   this.ctgysrv.filterWiseProduct(id,'','','','','no').subscribe((data:any) => {
  //     this.productList =  data
  //     console.log(this.productList,'rerererererer')
  //   })
  // }
  pauseVideo(videoplayer: any) {
    videoplayer.nativeElement.play();
    this.startedPlay = true;
    if (this.startedPlay == true) {
      setTimeout(() => {
        videoplayer.nativeElement.pause();
        if (videoplayer.nativeElement.paused) {
          this.show = !this.show;
        }
      }, 5000);
    }
  }
  closebutton(videoplayer: { nativeElement: { play: () => void } }) {
    this.show = !this.show;
    videoplayer.nativeElement.play();
  }
  // Page Reload on Change Orientation  ====================
  @HostListener("window:orientationchange", ["$event"])
  onOrientationChange(event: any) {
    const headerClass3: any = document.querySelector("header");
    headerClass3.classList.remove("changed");
    window.location.reload();
  }
  @HostListener("window:resize", ["$event"])
  sizeChange(event: any) {}
  // ====================================================
  // Animation ==========================================
  initScrollTriggers() {
    // Animation for screen width equal to and above 768px
    installMediaQueryWatcher("(min-width: 768px)", function (matches: any) {
      if (matches) {
        const animateWrapper = gsap.timeline({
          scrollTrigger: {
            trigger: ".animate-wrapper",
            pin: true,
            scrub: 1,
            start: "start start",
            // end: '+=' + window.innerHeight * 30,
            end: "+=30000",
          },
        });
        animateWrapper
          .from(".main-banner", { zIndex: 1, duration: 0.01 })
          .to(".main-banner", { zIndex: 1, duration: 0.01 })
          .from(".rd-mb-5", { opacity: 0, duration: 1 })
          .to(".fade-top", { opacity: 0, y: "-50vh", duration: 1.3, zIndex: 1 })
          .to(".main-banner", { zIndex: -1 })
          .to(".curate-deep", { zIndex: 1, duration: 0.01 })
          .from(".curate-deep-text", { opacity: 0, y: "50vh", duration: 1.3 })
          .to(".curate-deep-text", { opacity: 1, y: "0", duration: 0.1 })
          .from(".curate-deep-img figure", { height: 0, duration: 1 })
          .to(".curate-deep-img figure", { height: "434px", duration: 1 })
          .from(".img-text h2", { height: "0%", duration: 0.1 })
          .to(".img-text h2", { height: "100%", duration: 1 })
          .to(".curate-deep-text", { opacity: 0, y: "0", duration: 0.001 })
          .to(".img-text", { opacity: 1, duration: 0.1 })
          .to(".curate-deep-text,.curate-deep-img figure,.img-text", {
            opacity: 0,
            y: "-50vh",
            duration: 1.5,
          })
          .to(".curate-deep", { zIndex: 1, duration: 0.01 })
          .to(".curate-deep", { zIndex: -1, duration: 0.01 })
          .to(".origin-value", { zIndex: 1, duration: 0.01 })
          .from(".origin-value-img", { opacity: 0, duration: 0.5, delay: 0.2 })
          .to(".origin-value-img", { opacity: 1, duration: 0.5, ease: "none" })
          .from(".origin-value .overlay-text", {
            opacity: 0,
            duration: 2,
            y: "50vh",
          })
          .to(".origin-value .overlay-text", {
            opacity: 1,
            y: "0",
            duration: 1,
          })
          .to(".origin-value .overlay-text", {
            opacity: 0,
            y: "-50vh",
            duration: 2,
          })
          .to(".origin-value-img", { opacity: 0, duration: 0.5 })
          .to(".origin-value", { zIndex: 1, duration: 0.01 })
          .to(".origin-value", { zIndex: -1, duration: 0.01 })
          .to(".origin-value-text", { zIndex: 1, duration: 0.01 })
          .from('.origin-value-text [data-value="2"]', {
            opacity: 0,
            duration: 1,
          })
          .from('.origin-value-text [data-value="3"]', {
            opacity: 0,
            duration: 1,
          })
          .from('.origin-value-text [data-value="4"]', {
            opacity: 0,
            duration: 1,
          })
          .to(".origin-value-text", { opacity: 0, duration: 1 })
          .to(".origin-value-text", { zIndex: 1, duration: 0.01 })
          .to(".origin-value-text", { zIndex: -1, duration: 0.01 })
          .to(".real-value", { zIndex: 1, duration: 0.01 })
          .from('.real-value [data-value="1"]', {
            opacity: 0,
            duration: 2,
            y: "50vh",
          })
          .to('.real-value [data-value="1"]', {
            opacity: 1,
            y: "0",
            duration: 1,
          })
          .to('.real-value [data-value="1"]', {
            opacity: 0,
            y: "-50vh",
            duration: 2,
            ease: "none",
          })
          .to(".real-value", { zIndex: 1, duration: 0.01 })
          .to(".real-value", { zIndex: -1, duration: 0.01 })

          .to(".their-stories", { zIndex: 1, duration: 0.01 })
          .from("ngx-slick-carousel,.their-stories .csheading", {
            opacity: 0,
            duration: 1,
            delay: 0.2,
          })
          .to(".their-stories", { opacity: 1, duration: 1, zIndex: 9 })
          .to(".their-stories", { opacity: 0, duration: 1, zIndex: 9 })
          .to(".their-stories", { zIndex: 1, duration: 0.01 })
          .to(".their-stories", { zIndex: -1, duration: 0.01 })
          .to(".diamond-always", { zIndex: 1, duration: 0.01 })
          .from('.diamond-always [data-value="1"]', {
            opacity: 0,
            duration: 2,
            y: "50vh",
            delay: 0.2,
          })
          .to('.diamond-always [data-value="1"]', {
            opacity: 1,
            y: "0",
            duration: 1,
          })
          .to('.diamond-always [data-value="1"]', {
            opacity: 0,
            y: "-50vh",
            duration: 2,
            ease: "none",
          })
          .to(".diamond-always", { zIndex: 1, duration: 0.01 })
          .to(".diamond-always", { zIndex: -1, duration: 0.01 })
          .to(".text-sec-cs", { zIndex: 1, duration: 0.01 })
          .from('.text-sec-cs  [data-value="1"]', {
            opacity: 0,
            duration: 2,
            y: "50vh",
            delay: 0.2,
          })
          .to('.text-sec-cs  [data-value="1"]', {
            opacity: 1,
            y: "0",
            duration: 1,
          })
          .to('.text-sec-cs  [data-value="1"]', {
            opacity: 0,
            y: "-50vh",
            duration: 2,
          })
          .to(".text-sec-cs", { zIndex: 1, duration: 0.01 })
          .to(".text-sec-cs", { zIndex: -1, duration: 0.01 })
          .to(".diamond-jewelry", { zIndex: 1, duration: 0.01 })
          .from(".diamond-jewelry", { opacity: 0, duration: 1, delay: 0.2 })
          .to('.diamond-jewelry [data-value="1"]', { opacity: 1, duration: 2 })
          .from('.diamond-jewelry [data-value="2"]', {
            opacity: 0,
            duration: 0.5,
          })
          .to('.diamond-jewelry [data-value="2"]', {
            opacity: 1,
            duration: 0.5,
          })
          .to('.diamond-jewelry [data-value="2"]', {
            opacity: 0,
            duration: 0.5,
          })
          .to('.diamond-jewelry [data-value="1"]', {
            opacity: 0,
            duration: 1.5,
          })
          .to(".diamond-jewelry", { zIndex: 1, duration: 0.01 })
          .to(".diamond-jewelry", {
            zIndex: -1,
            duration: 0.01,
          });

        const animateWrapper1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".shop-sec",
            start: "top 100%",
            end: "bottom 100px",
            onToggle: (self) => {
              if (self.isActive) {
                const shopRemove: any =
                  document.querySelector(".bottom-shop-btn");
                if (document.getElementById("bottom-btn")) {
                  shopRemove.classList.add("hidden");
                }
              } else {
                const shopRemove: any =
                  document.querySelector(".bottom-shop-btn");
                if (document.getElementById("bottom-btn")) {
                  shopRemove.classList.remove("hidden");
                }
              }
            },
          },
        });
        animateWrapper1;

        const animateWrapper2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".shop-sec",
            start: "top 5%",
            end: "bottom 100px",

            onToggle: (self) => {
              if (self.isActive) {
                const partner1: any = document.querySelector("header");
                if (document.getElementById("header")) {
                  partner1.classList.add("changed");
                }
              } else {
                const partner2: any = document.querySelector("header");
                if (document.getElementById("header")) {
                  partner2.classList.remove("changed");
                }
              }
            },
          },
        });
      }
    });
    // Animation for screen width equal to and below 767px
    installMediaQueryWatcher("(max-width: 767px)", function (matches: any) {
      if (matches) {
        const animateWrapper = gsap.timeline({
          scrollTrigger: {
            trigger: ".animate-wrapper",
            pin: true,
            scrub: 0.5,
            // scrub: 0.1,
            start: "start start",
            end: "+=18000px",
            // scroller: ".cs-wrap",
            // end: '+=50000px',
            // end: '+=' + window.innerHeight * 5000,
          },
        });
        animateWrapper
          .from(".main-banner", { zIndex: 1, duration: 0.001, opacity: 1 })
          .to(".main-banner", { zIndex: 1, duration: 0.001, opacity: 1 })
          .from(".rd-mb-5", { opacity: 0, duration: 1 })
          .to(".main-banner", {
            opacity: 0,
            y: "-50%",
            duration: 1.3,
            ease: "linear",
          })
          .to(".main-banner", { zIndex: -1, opacity: 0, duration: 0.001 })
          // 2
          .from(".curate-deep", { zIndex: -1, duration: 0.001, opacity: 0 })
          .to(".curate-deep", { zIndex: 1, opacity: 1, duration: 0.001 })
          .from(".curate-deep-text", {
            opacity: 0,
            y: "50vh",
            duration: 1.3,
            ease: "linear",
          })
          .to(".curate-deep-text", { opacity: 1, y: "0", duration: 0.1 })
          .from(".curate-deep-img figure", {
            height: 0,
            duration: 0.2,
            ease: "linear",
          })
          .to(".curate-deep-img figure", {
            height: "90px",
            duration: 0.3,
            ease: "linear",
          })

          .to(".curate-deep-img figure", {
            height: "434px",
            duration: 2,
            ease: "linear",
          })
          .from(".curate-deep .img-text h2", { height: "0%", duration: 1 })
          .to(".curate-deep .img-text h2", { height: "100%", duration: 1 })
          .to(".curate-deep-text", { opacity: 0, y: "0", duration: 0.001 })
          .to(".curate-deep", {
            opacity: 0,
            y: "-50vh",
            duration: 1.3,
            ease: "linear",
          })
          .to(".curate-deep", { zIndex: 1, duration: 0.001, opacity: 0 })
          .to(".curate-deep", { zIndex: -1, duration: 0.001, opacity: 0 })
          // 3
          .from(".origin-value", { zIndex: -1, duration: 0.001, opacity: 0 })
          .to(".origin-value", { zIndex: 1, opacity: 1, duration: 0.001 })
          .from(".origin-value-img", { opacity: 0, duration: 0.5, delay: 0.2 })
          .to(".origin-value-img", { opacity: 1, duration: 0.1, ease: "none" })
          .from(".origin-value .overlay-text", {
            opacity: 0,
            duration: 2,
            y: "50vh",
            ease: "linear",
          })
          .to(".origin-value .overlay-text", {
            opacity: 1,
            y: "0",
            duration: 0.001,
            ease: "linear",
          })
          .to(".origin-value .overlay-text", {
            opacity: 0,
            y: "-50vh",
            duration: 2,
            ease: "linear",
          })
          .to(".origin-value-img", { opacity: 0, duration: 0.5 })
          .to(".origin-value", { zIndex: 1, duration: 0.001, opacity: 1 })
          .to(".origin-value", { zIndex: -1, duration: 0.001, opacity: 0 })
          // 4
          .from(".origin-value-text", {
            zIndex: -1,
            duration: 0.001,
            opacity: 0,
          })
          .to(".origin-value-text", { zIndex: 1, duration: 0.001, opacity: 1 })
          .from('.origin-value-text [data-value="2"]', {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .to('.origin-value-text [data-value="2"]', {
            opacity: 1,
            duration: 0.7,
            ease: "linear",
          })
          .to('.origin-value-text [data-value="2"]', {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .from('.origin-value-text [data-value="3"]', {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .to('.origin-value-text [data-value="3"]', {
            opacity: 1,
            duration: 0.7,
            ease: "linear",
          })
          .to('.origin-value-text [data-value="3"]', {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .from('.origin-value-text [data-value="4"]', {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .to('.origin-value-text [data-value="4"]', {
            opacity: 1,
            duration: 0.7,
            ease: "linear",
          })
          .to('.origin-value-text [data-value="4"]', {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .to(".origin-value-text", { opacity: 0, duration: 1, ease: "linear" })
          .to(".origin-value-text", { zIndex: 1, duration: 0.001 })
          .to(".origin-value-text", { zIndex: -1, duration: 0.001 })

          // 6
          .from(".real-value", { zIndex: -1, duration: 0.001, opacity: 0 })
          .to(".real-value", { zIndex: 1, duration: 0.001, opacity: 1 })
          .from('.real-value [data-value="1"]', {
            opacity: 0,
            duration: 2,
            y: "50vh",
            ease: "linear",
          })
          .to('.real-value [data-value="1"]', {
            opacity: 1,
            y: "0",
            duration: 0.001,
            ease: "linear",
          })
          .to('.real-value [data-value="1"]', {
            opacity: 0,
            y: "-50vh",
            duration: 2,
            ease: "linear",
          })
          // .to('.real-value', {
          //   zIndex: 1,
          //   duration: 0.01,
          //   opacity:1,
          // })
          .to(".real-value", { zIndex: -1, duration: 0.01, opacity: 0 })
          // 7
          .from(".their-stories", {
            zIndex: -1,
            display: "none",
            duration: 0.01,
            opacity: 0,
            ease: "linear",
          })
          .to(".their-stories", {
            zIndex: 1,
            display: "flex",
            opacity: 1,
            duration: 0.01,
            ease: "linear",
          })
          .from(".their-stories >*", {
            opacity: 0,
            duration: 0.8,
            ease: "linear",
          })
          .to(".their-stories >*", {
            opacity: 1,
            duration: 0.8,
            ease: "linear",
          })
          .to(".their-stories > *", {
            opacity: 0,
            duration: 0.8,
            ease: "linear",
          })
          // .to('.their-stories', {
          //   zIndex: 1,
          //   duration: 1,
          //   opacity:0,
          //   ease: "linear",
          // })
          .to(".their-stories", {
            zIndex: -1,
            display: "none",
            opacity: 0,
            duration: 0.01,
            ease: "linear",
          })
          // 8
          .from(".diamond-always", { zIndex: -1, duration: 0.01, opacity: 0 })
          .to(".diamond-always", { zIndex: 1, duration: 0.01, opacity: 1 })
          .from('.diamond-always [data-value="1"]', {
            opacity: 0,
            duration: 2,
            y: "50vh",
            ease: "linear",
          })
          .to('.diamond-always [data-value="1"]', {
            opacity: 1,
            y: "0",
            duration: 0.001,
            ease: "linear",
          })
          .to('.diamond-always [data-value="1"]', {
            opacity: 0,
            y: "-50vh",
            duration: 2,
            ease: "linear",
          })
          .to(".diamond-always", { zIndex: 1, duration: 0.01, opacity: 1 })
          .to(".diamond-always", { zIndex: -1, duration: 0.01, opacity: 0 })
          // 9
          .from(".text-sec-cs", { zIndex: -1, duration: 0.01, opacity: 0 })
          .to(".text-sec-cs", { zIndex: 1, opacity: 1, duration: 0.01 })
          .from('.text-sec-cs  [data-value="1"]', {
            opacity: 0,
            duration: 2.5,
            y: "100vh",
            ease: "linear",
          })
          .to('.text-sec-cs  [data-value="1"]', {
            y: "0vh",
            duration: 0.001,
            opacity: 1,
            ease: "linear",
          })
          .to('.text-sec-cs  [data-value="1"]', {
            y: "-100vh",
            duration: 2.5,
            opacity: 0,
            ease: "linear",
          })
          .to(".text-sec-cs", { zIndex: 1, duration: 0.01, opacity: 1 })
          .to(".text-sec-cs", { zIndex: -1, duration: 0.01, opacity: 0 })
          // 10
          .from(".diamond-jewelry", { zIndex: -1, duration: 0.01, opacity: 0 })
          .to(".diamond-jewelry", { zIndex: 1, duration: 0.01, opacity: 1 })
          .from(".diamond-jewelry .top-text", {
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "linear",
          })
          .to(".diamond-jewelry .top-text", {
            opacity: 1,
            duration: 0.7,
            ease: "linear",
          })
          .to(".diamond-jewelry .top-text", {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .from(".diamond-jewelry .bottom-img", {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .to(".diamond-jewelry .bottom-img", {
            opacity: 1,
            duration: 0.7,
            ease: "linear",
          })
          .to(".diamond-jewelry .bottom-img", {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .from(".diamond-jewelry .center-img", {
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "linear",
          })
          .to(".diamond-jewelry .center-img", {
            opacity: 1,
            duration: 0.7,
            ease: "linear",
          })
          .to(".diamond-jewelry .center-img", {
            opacity: 0,
            duration: 0.7,
            ease: "linear",
          })
          .to(".diamond-jewelry", { zIndex: 1, duration: 0.01, opacity: 1 })
          .to(".diamond-jewelry", { zIndex: -1, duration: 0.01, opacity: 0 });

        const animateWrapper1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".shop-sec",
            start: "top 100%",
            end: "bottom 100px",

            onToggle: (self) => {
              if (self.isActive) {
                const shopRemove: any =
                  document.querySelector(".bottom-shop-btn");
                if (document.getElementById("bottom-btn")) {
                  shopRemove.classList.add("hidden");
                }
              } else {
                const shopRemove: any =
                  document.querySelector(".bottom-shop-btn");
                if (document.getElementById("bottom-btn")) {
                  shopRemove.classList.remove("hidden");
                }
              }
            },
          },
        });
        animateWrapper1;
        const animateWrapper2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".shop-sec",
            start: "top 5%",
            end: "bottom 100px",
            onToggle: (self) => {
              if (self.isActive) {
                const partner1: any = document.querySelector("header");
                if (document.getElementById("header")) {
                  partner1.classList.add("changed");
                }
              } else {
                const partner2: any = document.querySelector("header");
                if (document.getElementById("header")) {
                  partner2.classList.remove("changed");
                }
              }
            },
          },
        });
        animateWrapper2;
      }
    });
    function installMediaQueryWatcher(
      mediaQuery: any,
      layoutChangedCallback: any
    ) {
      var mql = window.matchMedia(mediaQuery);
      mql.addListener(function (e) {
        return layoutChangedCallback(e.matches);
      });
      layoutChangedCallback(mql.matches);
    }
    // end =============================================
  }

  // End====================================================================

  // Shop Sliders =======================================================
  Polish = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".carousel2_0,.carousel3_0",
    vertical: true,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          horizontal: true,
        },
      },
    ],
  };

  Raw = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".carousel2_1,.carousel3_1",
    vertical: true,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          horizontal: true,
        },
      },
    ],
  };

  slideConfig1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".carousel3,.carousel1",
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: "linear",
    draggable: false,
    infinite: true,
  };

  slideConfig2 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".carousel2,.carousel1",
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: "linear",
    draggable: false,
    infinite: true,
  };

  slideConfig3 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".carousel4,.carousel1",
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: "linear",
    draggable: false,
    infinite: true,
  };
  // rings

  shopsliderings = [
    {
      productImg: "../../../assets/img/shop/webp/polish-1.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,247",
      proAddress: "0.63 CARAT  COLOR M  CLARITY SI2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-1.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-1.png",
      ownerName: "Sia Senesi",
      ownerDes:
        "She lives in Kono, Sierra Leone with her 3 children and husband. Business: Sia‘s goal is to use her funds to become an Agro Entrepreneur Processing. This involves planting and selling agricultural produce by becoming a market vendor.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-2.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "5,139",
      proAddress: "0.99 CARAT  COLOR J  CLARITY SI3",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-2.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-2.png",
      ownerName: "Denis Komba",
      ownerDes:
        "Denis Komba has one child at university and several younger kids in secondary school. He is planning to use the money from Root Diamonds to make sure all of his children can attend university, buy a home, and fund his wife’s business aspirations. Business: Wants to provide start-up capital for his Wife. His Wife plans to start a local store for a food catering business. Sadly We found out that Denis has passed away. We plan to give the funds to his family to fulfill their dreams of starting a business.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-3.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,373",
      proAddress: "0.71 CARAT  COLOR I  CLARITY SI1",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-3.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-3.png",
      ownerName: "Hawa Jabbie",
      ownerDes:
        "Hawa Jabbie took over the land for her husband when he passed away. She once was with him when he found a 10 carat stone on their land. As a single mother she is working to put her 5 kids through school and keep a roof over their head. Business: Hawa’s goal is to use her funds to become an Agro Entrepreneur Processing. This involves planting and selling agricultural produce by becoming a market vendor.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-4.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,571",
      proAddress: "0.76 CARAT  COLOR K  CLARITY SI1",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-4.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-4.png",
      ownerName: "Sahr Timbo",
      ownerDes:
        "Sahr Timbo is needing money so that they can build their own home, they are currently living with all of their extended family under one roof. Sahr has been mining for years and says that companies will tell the miners they will be paid well, then leave the country before paying what is owed. Business:Building homes",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-5.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,299",
      proAddress: "0.41 CARAT  COLOR F  CLARITY SI2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-5.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-5.png",
      ownerName: "Chief Aiah Baffor",
      ownerDes:
        "Chief Aiah Baffor has owned their land for over 14 years now, and they rely on it to take care of 6 children and 9 grandchildren.In the past they have relied on foreign diamond companies to provide equipment to mine the land, but payment has not been consistent. Baffor believes that working with Root Diamonds will provide a more secure life for his family. Business: Aliah Baffor’s goal is to use his funds to become an Agro Entrepreneur Processing. This involves planting and selling agricultural produce by becoming a market vendor.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-6.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "2,517",
      proAddress: "0.53 CARAT  COLOR E  CLARITY VVS",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-6.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-6.png",
      ownerName: "Chief Kemoh",
      ownerDes:
        "Chief Kemoh has abandoned their plot of land that they used to mine because they were not being paid anything for their hours of hard labor. Most of Chief Kemoh children have dropped out of school because he cannot afford to support them. Chief Kemoh plans to build his family a home and send all of his children back to school with his wages from Root Diamonds. Business: Loan facilities to assist families in need.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-7.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "2,026",
      proAddress: "0.45 CARAT  COLOR F  CLARITY VVS",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-7.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-7.png",
      ownerName: "Mohamed Mansaray",
      ownerDes:
        "Mohammed Mansary owns two plots of land he can mine on. He started mining the first, and was fortunate to earn enough to start his own shop in town. Mohammed only wants to mine the second plot of land if it is with a company like Root Diamonds. He knows most other companies will take advantage of his labor and not pay him what is owed. Business: Shop.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-8.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "4,107",
      proAddress: "0.6 CARAT  COLOR I CLARITY I2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-8.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-8.png",
      ownerName: "Fatmata Marrah",
      ownerDes:
        "SFatmata’s husband has passed and she is responsible for 8 children. Her sister lives with her as well because her sister’s husband recently passed. She does not like mining because of the poor working conditions and the minimal pay. However, it is the only thing she knows that can support her family. Fatmata’s dream is for all of her children to receive an education, but currently only some of them can attend school. Business: Mining land restoration",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-9.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "4,118",
      proAddress: "0.9 CARAT  COLOR F  CLARITY VVS",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-9.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-9.png",
      ownerName: "Chief Kellie",
      ownerDes:
        "Chief Kellie lives with his two children and wife. He has managed several mining operations in his life. He says he has been unfairly treated by foreign sponsors and has only seen more profit when he worked for himself rather than working for foreign mining operations. Business: Aims to become a wholesale Agro Entrepreneur. This involves planting and selling agricultural produce by becoming a market vendor and having multiple agents.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-10.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "4,384",
      proAddress: "0.82 CARAT  COLOR H-1  CLARITY SI1",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-10.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-10.png",
      ownerName: "Alice & Tampa Yomba",
      ownerDes:
        "Tamba and Alie Yomba have eight children and seven grandchildren together. They have owned their land since 1976 and once found a 25-carat diamond on the property. Tampa and Alize had to rely on foreign mining companies to mine their land and were not paid enough from the proceeds, and unless they work with a company that has better terms and stuck with their promises, they do not plan to mine their land. Business: The Yomba family wants to buy wholesale goods in Guinea to sell to retailers in the surrounding village towns.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-11.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,442",
      proAddress: "0.79 CARAT  COLOR I-J  CLARITY VS1-SI1",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-11.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-11.png",
      ownerName: "Mr. & Mrs. Sia Gborie",
      ownerDes:
        "Mr. Gborie is the Chiefdom Authority and has lived in his village since 1952 after his first employer collapsed. He and his wife Sia have been in the mining business for decades. They have started much business but recently shut down their auto mechanic shop. Currently, their biggest concern is putting their children through college. Business: They want to restart their auto mechanic business that shut down that can help sponsor their children's education.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-12.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "2,850",
      proAddress: "0.66 CARAT  COLOR  F-E  CLARITY VVS-SI1",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-12.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-12.png",
      ownerName: "T.S Fasuluku",
      ownerDes:
        "T.S Fasulaku left their job at Njala University to work at the diamond mines. The biggest problem he has seen in the industry is that the moment someone gets ahold of a diamond, they change. People break their commitments and act out of pure greed. Business: Aims to open a diamond literacy vocational institute for town members.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-13.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "2,588",
      proAddress: "0.62 CARAT  COLOR K-J  CLARITY SI1-VVS",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-13.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-13.png",
      ownerName: "Mohamed Famble",
      ownerDes:
        "Mohammed has nine children. To survive, they work together to do small trading jobs as well as mining. His wife sells rice bags, palm oil, salt, and onions in the city of Koidu, while Mohammed sells any diamond he finds to visiting buyers. Mohammed does not work with any mining company due to a lack of trust and mines his land entirely by himself. Business: Expand and build upon his wife's business to create an all-in-one merchant shop in Koidu.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-14.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,628",
      proAddress: "0.84 CARAT  COLOR G-H  CLARITY I1-VS2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-14.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-14.png",
      ownerName: "Sahr Biango",
      ownerDes:
        "Sahr Biango and his wife both work in mining and agriculture and have seven children. They worry about the seasons where the farmland does not produce strong crops that they can sell and have relied on mining to support their family. Business: Sahr is an excellent salesman and wants to open a cell phone and electronics shop to sell it in the urban markets near his home.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-15.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,271",
      proAddress: "0.76 CARAT  COLOR L-L CLARITY SI-I2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-15.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-15.png",
      ownerName: "Sahr Kabba",
      ownerDes:
        "For 40 years, Mr. Kabba has been mining and have noticed that the people who profit the most from all the labor are the people to whom the miners sell the diamonds. The laborers are worked extra hard, and landowners struggle to afford to feed them because of a lack of access to the necessary tools and funding. Business: A mining shop where he can sell small scale good mining equipment at an affordable price for the community.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-16.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "5,056",
      proAddress: "1.09 CARAT  COLOR I-K  CLARITY SI3-I2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-16.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-16.png",
      ownerName: "Tamba Sesay",
      ownerDes:
        "Tamba has been mining since 1976 and was granted two plots of mining land from the Parliament Chief. Tamba worked their way to become a Chief themselves. Before he dies, he hopes to see his mining labor benefit all seven of his children. Business: Wants to start taxi operations and become a motor driver by buying a small local taxi.",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-17.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "3,980",
      proAddress: "0.83 CARAT  COLOR M-L  CLARITY I2-VVS",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-17.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-17.png",
      ownerName: "Yei Bona",
      ownerDes:
        " Yei Bona has an acre of land that was left to her by her late husband. She and her eldest brother are looking for supporters like Root Diamonds to mine the land and be paid a fair amount to provide for her family. Her granddaughter is waiting for the results of her national exam to see if she got into university. Her biggest priority is access to ac consistent income to assist with her granddaughter's college education. Business:   Expand her palm oil business to supply neighboring villages at wholesale ",
    },
    {
      productImg: "../../../assets/img/shop/webp/polish-18.png",
      isOpenOverlay: false,
      proName: "Polish Diamonds",
      proPrice: "2,734",
      proAddress: "0.64 CARAT  COLOR L-M  CLARITY I2-VS2",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-18.png",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-18.png",
      ownerName: "Kai Aruna",
      ownerDes:
        "Kai Aruna has two children with his wife, and he inherited his land from his father after he passed away. The land has been in Aruna's family for over 50 years. His father once found a 20-carat diamond on their mining land. Kie Aroma has been working in construction because it is financially risky to rely on being paid for mining his land by foreign corporations. Business: Aims to attend the vocational institute in Koidu to learn photography, purchase a camera, and become a part-time town professional photographer.",
    },
  ];
  // Earings
  shopslideearings = [
    {
      productImg: "../../../assets/img/shop/webp/earring-1.webp",
      isOpenOverlay: false,
      proName: "4-Prong Cocktail-Earrings",
      proPrice: "3,495",
      proAddress: "18K YELLOW GOLD  .99 CARAT  COLOR J  CLARITY SI3",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-9.webp",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-9.webp",
      ownerName: "Chief Kellie",
      ownerDes:
        "Chief Kellie lives with his two children and wife. He has managed several mining operations in his life. He says he has been unfairly treated by foreign sponsors and has only seen more profit when he worked for himself rather than working for foreign mining operations.<br> Business: Aims to become a wholesale Agro Entrepreneur. This involves planting and selling agricultural produce by becoming a market vendor and having multiple agents.",
    },
    {
      productImg: "../../../assets/img/shop/webp/earring-2.webp",
      isOpenOverlay: false,
      proName: "Round mini diamond studs",
      proPrice: "3,495",
      proAddress: "18K YELLOW GOLD  .99 CARAT  COLOR J  CLARITY SI3",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-10.webp",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-10.webp",
      ownerName: "Alice & Tampa Yomba",
      ownerDes:
        "Tamba and Alie Yomba have eight children and seven grandchildren together. They have owned their land since 1976 and once found a 25-carat diamond on the property. Tampa and Alize had to rely on foreign mining companies to mine their land and were not paid enough from the proceeds, and unless they work with a company that has better terms and stuck with their promises, they do not plan to mine their land.<br>Business: The Yomba family wants to buy wholesale goods in Guinea to sell to retailers in the surrounding village towns.",
    },
    {
      productImg: "../../../assets/img/shop/webp/earring-3.webp",
      isOpenOverlay: false,
      proName: "Bezel studs Yellow Gold",
      proPrice: "3,495",
      proAddress: "18K YELLOW GOLD  .99 CARAT  COLOR J  CLARITY SI3",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-11.webp",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-11.webp",
      ownerName: "Mr. & Mrs. Sia Gborie",
      ownerDes:
        "Mr. Gborie is the Chiefdom Authority and has lived in his village since 1952 after his first employer collapsed. He and his wife Sia have been in the mining business for decades. They have started much business but recently shut down their auto mechanic shop. Currently, their biggest concern is putting their children through college.<br>Business: They want to restart their auto mechanic business that shut down that can help sponsor their children's education.",
    },
    {
      productImg: "../../../assets/img/shop/webp/earring-4.webp",
      isOpenOverlay: false,
      proName: "Round Stud White Gold",
      proPrice: "3,495",
      proAddress: "18K YELLOW GOLD  .99 CARAT  COLOR J  CLARITY SI3",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-12.webp",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-12.webp",
      ownerName: "T.S Fasulaku",
      ownerDes:
        "T.S Fasulaku left their job at Njala University to work at the diamond mines. The biggest problem he has seen in the industry is that the moment someone gets ahold of a diamond, they change. People break their commitments and act out of pure greed.<br>Business: Aims to open a diamond literacy vocational institute for town members.",
    },
    {
      productImg: "../../../assets/img/shop/webp/earring-5.webp",
      isOpenOverlay: false,
      proName: "Round mini diamond studs",
      proPrice: "3,495",
      proAddress: "18K YELLOW GOLD  .99 CARAT  COLOR J  CLARITY SI3",
      proEdition: "Limited Edition",
      ownerImg: "../../../assets/img/shop/webp/owner-13.webp",
      ownerThumb: "../../../assets/img/shop/webp/owner-thumb-img-13.webp",
      ownerName: "Mohamed Famble",
      ownerDes:
        "Mohammed has nine children. To survive, they work together to do small trading jobs as well as mining. His wife sells rice bags, palm oil, salt, and onions in the city of Koidu, while Mohammed sells any diamond he finds to visiting buyers. Mohammed does not work with any mining company due to a lack of trust and mines his land entirely by himself.<br> Business: Expand and build upon his wife's business to create an all-in-one merchant shop in Koidu.",
    },
  ];
  // Shop Sliders End ==================================================

  // The Stories Slider ==================================================
  storiesSlider = {
    method: {},
    slidesToShow: 1,
    arrows: true,
    // fade: true,
    dots: false,
    slidesToScroll: 1,
    draggable: false,
    responsive: [
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  };
  // End =================================================================
  // @ViewChild('slickModal') slickModal: any;

  // ngAfterViewInit(): void {
  //   this.storiesCarousels.method.slickGoTo(6);
  // }
  // Stories slider ======================================================
  isVisible7 = false;
  storiesCarousel(): void {
    this.isVisible7 = true;
  }
  handleCancel7(): void {
    this.isVisible7 = false;
  }
  storiesCarousels = {
    method: {},
    slidesToShow: 1,
    arrows: false,
    fade: true,
    dots: false,
    asNavFor: ".stories-carousel-thumbnail",
    adaptiveHeight: true,
    draggable: false,
  };

  // ==============================
  defaultImage = "../../../assets/img/placeholder.jpg";
  image_1 = "../../../assets/img/their-stories/webp/stories-1.webp";
  image_2 = "../../../assets/img/their-stories/webp/stories-2.webp";
  image_3 = "../../../assets/img/their-stories/webp/stories-3.webp";
  image_4 = "../../../assets/img/their-stories/webp/stories-4.webp";
  image_5 = "../../../assets/img/their-stories/webp/stories-5.webp";
  image_6 = "../../../assets/img/their-stories/webp/stories-6.webp";
  image_7 = "../../../assets/img/their-stories/webp/stories-7.webp";
  image_8 = "../../../assets/img/their-stories/webp/stories-8.webp";
  image_9 = "../../../assets/img/their-stories/webp/stories-9.webp";
  image_10 = "../../../assets/img/their-stories/webp/stories-10.webp";
  image_11 = "../../../assets/img/their-stories/webp/stories-11.webp";
  image_12 = "../../../assets/img/their-stories/webp/stories-12.webp";
  image_13 = "../../../assets/img/their-stories/webp/stories-13.webp";
  image_14 = "../../../assets/img/their-stories/webp/stories-14.webp";
  image_15 = "../../../assets/img/their-stories/webp/stories-15.webp";
  image_16 = "../../../assets/img/their-stories/webp/stories-16.webp";
  image_17 = "../../../assets/img/their-stories/webp/stories-17.webp";
  image_18 = "../../../assets/img/their-stories/webp/stories-18.webp";

  // ==============================

  storiesCarouselThumbnail = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".stories-carousel",
    dots: false,
    focusOnSelect: true,
    adaptiveHeight: true,
    arrows: true,
    vertical: true,
    draggable: false,
  };

  storiesSlides = [
    {
      img: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Hawa Jabbie",
      subTitle: "LAND OWNER",
      description:
        "Hawa took over the land from her husband when he passed away. She once was with him when he found a 10 carat stone on their land, but their sponsors gave them less than 1 % of the value back. As a single mother, she works to put her five kids through school and keep a roof over their heads. ",
    },
    {
      img: "../../../assets/img/their-stories/webp/Alice Yomba-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Alice Yomba-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Alice Yomba-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Alice Yomba",
      subTitle: "LAND OWNER",
      description:
        " Tamba and Alice Yomba have eight children and seven grandchildren together. They have owned their land since 1976 and once found a 25-carat diamond on the property. Tampa and Alize had to rely on foreign mining companies to mine their land and were not paid enough from the proceeds, and unless they work with a company that has better terms and stuck with their promises, they do not plan to mine their land. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Hawa Jabbie",
      subTitle: "LAND OWNER",
      description:
        "  Hawa took over the land from her husband when he passed away. She once was with him when he found a 10 carat stone on their land, but their sponsors gave them less than 1 % of the value back. As a single mother, she works to put her five kids through school and keep a roof over their heads. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Hawa Jabbie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Hawa Jabbie",
      subTitle: "LAND OWNER",
      description:
        " Hawa took over the land from her husband when he passed away. She once was with him when he found a 10 carat stone on their land, but their sponsors gave them less than 1 % of the value back. As a single mother, she works to put her five kids through school and keep a roof over their heads. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Sahr Timbo-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Sahr Timbo-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Sahr Timbo-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Sahr Timbo",
      subTitle: "LAND OWNER",
      description:
        " Sahr currently lives with his extended family under one roof. He has been mining for years and says that the proceeds of the diamonds found in his land have not made it back to him. Foreign companies will tell the landowners and miners they will be paid a certain percentage; however, when diamonds are found, these sponsors leave the country before paying what is owed. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Chief Kellie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Chief Kellie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Chief Kellie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Chief Kellie",
      subTitle: "LAND OWNER",
      description:
        " Chief Kellie lives with his two children and wife. He has managed several mining operations in his life. He says he has been unfairly treated by foreign sponsors and has only seen more profit when he worked for himself rather than working for foreign mining operations. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Chief Kellie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Chief Kellie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Chief Kellie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Chief Kellie",
      subTitle: "LAND OWNER",
      description:
        " Chief Kellie lives with his two children and wife. He has managed several mining operations in his life. He says he has been unfairly treated by foreign sponsors and has only seen more profit when he worked for himself rather than working for foreign mining operations. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Chief Kellie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Chief Kellie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Chief Kellie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Chief Kellie",
      subTitle: "LAND OWNER",
      description:
        " Chief Kellie lives with his two children and wife. He has managed several mining operations in his life. He says he has been unfairly treated by foreign sponsors and has only seen more profit when he worked for himself rather than working for foreign mining operations. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Denis Komba-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Denis Komba-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Denis Komba-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Denis Komba",
      subTitle: "LAND OWNER",
      description:
        " Denis has one child at university and several younger kids in secondary school. He continually seeks ways to generate income to support his children in attending a university and fund his Wife’s business aspirations. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Sia Senesi-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Sia Senesi-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Sia Senesi-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Sia Senesi",
      subTitle: "LAND OWNER",
      description:
        " Sia lives with her three children in Kono. After her husband died, she took care of her children by herself. She sells cut-up potato leaves (agricultural produce) for a living. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Aiah Baffor-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Aiah Baffor-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Aiah Baffor-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Chief Aiah Baffor",
      subTitle: "LAND OWNER",
      description:
        " Chief Aiah Baffor has owned his mining land for over 14 years now and has relied on its operations to take care of six children and nine grandchildren. In the past, he has relied on foreign diamond companies to provide equipment to mine his land, but payment has not been consistent. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Chief Kemoh-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Chief Kemoh-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Chief Kemoh-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Chief Kemoh",
      subTitle: "LAND OWNER",
      description:
        " Chief Kemoh abandoned his mining operation and stopped a foreign sponsor from working on his land because he was not paid fairly for his hours of hard labor. Most of Chief Kemoh's children have dropped out of school due to his inability to support them. He hopes to build his family home and sponsor his children's education. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Mohamed Mansaray-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Mohamed Mansaray-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Mohamed Mansaray-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Mohamed Mansaray",
      subTitle: "LAND OWNER",
      description:
        " Mohammed owns two plots of land he can mine on. He started mining the first and was fortunate to earn enough to start his shop in town. Mohammed only wants to mine the second plot of land with a company like Root Diamonds. He knows most other companies will take advantage of his labor and the resources from his land and not pay him fairly. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Fatmata Marrah-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Fatmata Marrah-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Fatmata Marrah-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Fatmata Marrah",
      subTitle: "LAND OWNER",
      description:
        " Fatmata's husband recently died, leaving her responsible for their eight children. Her sister recently lives with her because her sister's husband recently passed away. She does not like mining because of the poor working conditions and the minimal pay. However, it is the only thing she knows to support her family. Fatmata's dream is for all of her children to receive an education, but only four of them can currently attend school. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Yei Bona-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Yei Bona-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Yei Bona-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Yei Bona",
      subTitle: "LAND OWNER",
      description:
        "  Yei Bona has an acre of land that was left to her by her late husband. She and her eldest brother are looking for supporters like Root Diamonds to mine the land and be paid a fair amount to provide for her family. Her granddaughter is waiting for the results of her national exam to see if she got into university. Her biggest priority is access to ac consistent income to assist with her granddaughter's college education. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Sahr Kabba-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Sahr Kabba-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Sahr Kabba-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Sahr Kabba",
      subTitle: "LAND OWNER",
      description:
        " For 40 years, Mr. Kabba has been mining and have noticed that the people who profit the most from all the labor are the people to whom the miners sell the diamonds. The laborers are worked extra hard, and landowners struggle to afford to feed them because of a lack of access to the necessary tools and funding. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Tamba Yomba-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Tamba Yomba-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Tamba Yomba-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Tamba Yomba",
      subTitle: "LAND OWNER",
      description:
        " Tamba and Alice Yomba have eight children and seven grandchildren together. They have owned their land since 1976 and once found a 25-carat diamond on the property. Tampa and Alize had to rely on foreign mining companies to mine their land and were not paid enough from the proceeds, and unless they work with a company that has better terms and stuck with their promises, they do not plan to mine their land. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Mohamed Famble-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Mohamed Famble-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Mohamed Famble-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Mohamed Famble",
      subTitle: "LAND OWNER",
      description:
        " Mohammed has nine children. To survive, they work together to do small trading jobs as well as mining. His wife sells rice bags, palm oil, salt, and onions in the city of Koidu, while Mohammed sells any diamond he finds to visiting buyers. Mohammed does not work with any mining company due to a lack of trust and mines his land entirely by himself. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Tamba Sesay-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Tamba Sesay-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Tamba Sesay-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Tamba Sesay",
      subTitle: "LAND OWNER",
      description:
        " Tamba has been mining since 1976 and was granted two plots of mining land from the Parliament Chief. Tamba worked their way to become a Chief themselves. Before he dies, he hopes to see his mining labor benefit all seven of his children. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Mrs. Sia Gborie-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Mrs. Sia Gborie-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Mrs. Sia Gborie-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Mrs. Sia Gborie",
      subTitle: "LAND OWNER",
      description:
        " Mr. Gborie is the Chiefdom Authority and has lived in his village since 1952 after his first employer collapsed. He and his wife Sia have been in the mining business for decades. They have started much business but recently shut down their auto mechanic shop. Currently, their biggest concern is putting their children through college. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/T.S Fasulaku-slider1.png",
      img2: "../../../assets/img/their-stories/webp/T.S Fasulaku-slider2.png",
      img3: "../../../assets/img/their-stories/webp/T.S Fasulaku-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "T.S Fasulaku",
      subTitle: "LAND OWNER",
      description:
        " T.S Fasulaku left their job at Njala University to work at the diamond mines. The biggest problem he has seen in the industry is that the moment someone gets ahold of a diamond, they change. People break their commitments and act out of pure greed. ",
    },

    {
      img: "../../../assets/img/their-stories/webp/Sahr Biango-slider1.png",
      img2: "../../../assets/img/their-stories/webp/Sahr Biango-slider2.png",
      img3: "../../../assets/img/their-stories/webp/Sahr Biango-slider3.png",
      // img3: '../../../assets/img/their-stories/story1-slider3.jpg',
      // img4: '../../../assets/img/their-stories/story1-slider4.jpg',
      title: "Sahr Biango",
      subTitle: "LAND OWNER",
      description:
        " Sahr Biango and his wife both work in mining and agriculture and have seven children. They worry about the seasons where the farmland does not produce strong crops that they can sell and have relied on mining to support their family. ",
    },
  ];

  activeSlide(one: any) {
    setTimeout(() => {
      let element: HTMLElement = document.querySelector(
        ".stories-carousel-thumbnail  [data-slick-index='" + one + "']"
      ) as HTMLElement;
      element.click();
    }, 100);
  }
  // Stories slider End ==================================================

  // Modal Product slider =============================================
  productSlider = {
    slidesToShow: 1,
    arrows: false,
    fade: true,
    dots: false,
    asNavFor: ".pro-carousel-thumbnail",
    adaptiveHeight: true,
  };

  imagesSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: false,
    fade: true,
    asNavFor: ".thumbs",
    adaptiveHeight: true,
  };

  thumbnailsSlider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    centerMode: true,
    draggable: false,
    focusOnSelect: true,
    asNavFor: ".feedback",
  };

  productSliderThumbnail = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".pro-carousel",
    dots: false,
    focusOnSelect: true,
    adaptiveHeight: true,
  };
  productSlides = [
    { img: "../../../assets/img/product-img-1.png", alt: "Image 1" },
    { img: "../../../assets/img/product-img-1.png", alt: "Image 2" },
    { img: "../../../assets/img/product-img-1.png", alt: "Image 3" },
  ];
  productEarrings = [
    { img: "../../../assets/img/shop/earing1.png", alt: "Image 1" },
    { img: "../../../assets/img/shop/earing2.png", alt: "Image 2" },
    { img: "../../../assets/img/shop/earing3.png", alt: "Image 3" },
  ];

  isVisible = false;
  showModal(product: object): void {
    console.log(product, "product details");
    this.productDetail = product;
    this.clearWholeSaleDetails();
    this.isVisible = true;
  }

  fillWholeSaleForm = false;
  onSubmitWholeSale(bol: boolean) {
    if (bol) {
      this.isWholeSaleVisible = false;
      this.fillWholeSaleForm = true;
      console.log("onsubmit", bol);
    }
  }

  isWholeSaleVisible = false;

  showModalWholeSale() {
    this.isWholeSaleVisible = true;
  }
  isWholeSaleChecked = false;
  changeValue(e: any) {
    this.isWholeSaleChecked = e.target.checked;
  }
  wholeSaleChange(bool: any, price: any) {
    this.checkIsWholeSale = bool;
    this.homesrv.getProductById(bool).subscribe((data: any) => {
      if (data) {
        this.loading = false;
      }
      this.productDetail = data;
      let galleryImg = this.productDetail.galleryImg;
      return { galleryImg };
    });
    let wholeSalecheck = this.isWholeSaleChecked
      ? this.productDetail?.wholesale_price_for_variation
      : this.productDetail?.whole_sale_price;
    let normal = this.isWholeSaleChecked
      ? this.productDetail?.sales_price_for_variation
      : this.productDetail?.price;

    this.newPrice = this.fillWholeSaleForm ? wholeSalecheck : normal;
    console.log("this.checkWholeSaleForm ", this.checkWholeSaleForm);
    localStorage.setItem(
      "product-item",
      JSON.stringify({
        state: {
          isWholeSaleChecked: this.isWholeSaleChecked,
          checkIsWholeSale: this.checkIsWholeSale,
          product: this.productDetail,
          wholeSalePrice: this.newPrice || price,
          checkWholeSaleForm: this.checkWholeSaleForm.value,
          productId: bool,
        },
      })
    );
    this.router.navigate([`/checkout/${this.productDetail.id || bool}`]);
  }
  handleOk(): void {
    this.isVisible = false;
  }

  clearWholeSaleDetails() {
    this.isWholeSaleChecked = false;
    this.fillWholeSaleForm = false;
    this.checkWholeSaleForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.productDetail = {};
    // this.isWholeSaleChecked = false;
    // this.fillWholeSaleForm = false;
  }

  handleWholeSaleCancle() {
    this.isWholeSaleVisible = false;
  }
  isVisibleEaring = false;
  showModalEaring(): void {
    this.isVisibleEaring = true;
  }
  handleOkEaring(): void {
    this.isVisibleEaring = false;
  }
  handleCancelEaring(): void {
    this.isVisibleEaring = false;
  }
  // Modal Product slider End ==========================================

  // Upload Your Memories ================================================
  // Modal 1
  isVisible1 = false;
  memoriesStep1(): void {
    this.isVisible1 = true;
  }
  handleCancel1(): void {
    this.isVisible1 = false;
  }
  // Modal 2
  isVisible2 = false;
  memoriesStep2(): void {
    this.isVisible2 = true;
  }
  handleCancel2(): void {
    this.isVisible2 = false;
    // this.isVisible1 = false;
  }
  // Modal 3
  isVisible3 = false;
  memoriesStep3(): void {
    this.isVisible3 = true;
  }
  handleCancel3(): void {
    this.isVisible3 = false;
  }
  // Modal 4
  isVisible4 = false;
  memoriesStep4(): void {
    this.isVisible4 = true;
  }
  handleCancel4(): void {
    this.isVisible4 = false;
  }
  // Modal 5
  isVisible5 = false;
  memoriesStep5(): void {
    this.isVisible5 = true;
  }
  handleCancel5(): void {
    this.isVisible5 = false;
  }
  // Modal 6
  isVisible6 = false;
  memoriesStep6(): void {
    this.isVisible6 = true;
  }
  handleCancel6(): void {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.isVisible5 = false;
    this.isVisible6 = false;
  }
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== "uploading") {
    }
  }

  memoriesStep3nw() {
    const stepRemove: any = document.querySelector(".step-2-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "-100%";
    const step2Active: any = document.querySelector(".step-3-memories");
    step2Active.classList.add("active");
  }
  memoriesStep4nw() {
    const stepRemove: any = document.querySelector(".step-3-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "-200%";
    const step2Active: any = document.querySelector(".step-4-memories");
    step2Active.classList.add("active");
  }
  memoriesStep5nw() {
    const stepRemove: any = document.querySelector(".step-4-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "-300%";
    const step2Active: any = document.querySelector(".step-5-memories");
    step2Active.classList.add("active");
  }
  memoriesStep6nw() {
    const stepRemove: any = document.querySelector(".step-5-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "-400%";
    const step2Active: any = document.querySelector(".step-6-memories");
    step2Active.classList.add("active");
  }
  memoriesStepBack2() {
    const stepRemove: any = document.querySelector(".step-3-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "0%";
    const step2Active: any = document.querySelector(".step-2-memories");
    step2Active.classList.add("active");
  }
  memoriesStepBack3() {
    const stepRemove: any = document.querySelector(".step-4-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "-100%";
    const step2Active: any = document.querySelector(".step-3-memories");
    step2Active.classList.add("active");
  }
  memoriesStepBack4() {
    const stepRemove: any = document.querySelector(".step-5-memories");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".sharememories-wrap");
    step2.style.marginLeft = "-200%";
    const step2Active: any = document.querySelector(".step-4-memories");
    step2Active.classList.add("active");
  }

  // End =================================================================
  //

  // Scroll to target Div ================================================
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  scrollWholeSale(el: HTMLElement) {
    el.scrollIntoView();
  }
  // Scroll to target Div End=============================================

  // Open overlay shop sec ===============================================
  story(shopslidering: any) {
    shopslidering.isOpenOverlay = true;
  }
  storyClose(shopslidering: any) {
    shopslidering.isOpenOverlay = false;
  }
  story1(shopslideearing: any) {
    shopslideearing.isOpenOverlay = true;
  }
  story1Close(shopslideearing: any) {
    shopslideearing.isOpenOverlay = false;
  }
  // Open overlay shop sec  End==========================================

  // Navigation =========================================================
  navigate() {
    this.router.navigate(["/contact-us"]);
  }
  moneyGoes() {
    this.router.navigate(["/where-your-money-goes"]);
  }
  rings() {
    localStorage.setItem("activeCatTab", this.tabCatName);

    this.router.navigate(["/category/0/0"]);
  }
  earings() {
    this.router.navigate(["/category/1/1"]);
  }
  // Navigation End=======================================================
}

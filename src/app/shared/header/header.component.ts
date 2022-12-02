import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { CommonService } from "src/app/services/common.service";
import { ActivatedRoute } from "@angular/router";
import Scrollbar from "smooth-scrollbar";
import { ChartConfiguration } from "chart.js";

interface Person {
  orderId: string;
  date: string;
  status: string;
  description: string;
  price: string;
}
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  checkUrl: boolean = false;
  constructor(
    private router: Router,

    private commonS: CommonService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((data: any) => {
      if (data instanceof NavigationEnd) {
        this.checkUrl =
          data.url.includes("checkout") || data.url.includes("order_success");
      }
    });
  }

  public lineChartData: ChartConfiguration["data"] = {
    datasets: [
      {
        data: [300, 300, 300, 300, 300, 300],
        label: "$",
        backgroundColor: "rgba(148,159,177,0)",
        borderColor: "#C9A791",
        pointBackgroundColor: "#323232",
        pointBorderColor: "#C9A791",
        pointHoverBackgroundColor: "#C9A791",
        pointHoverBorderColor: "#C9A791",
        fill: "",
      },
    ],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  };

  public lineChartOptions: ChartConfiguration["options"] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      x: {},
      "y-axis-0": {},
    },
    plugins: {
      legend: { display: false },
    },
  };
  status: boolean = false;
  status1: boolean = false;

  ngOnInit(): void {}

  // Sidebar Navigation ==================================
  // toggle navigation
  visible = false;
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
  // links
  navigate() {
    this.router.navigate(["/"]);
  }
  rings() {
    this.router.navigate(["/category/1/0"]);
  }
  earings() {
    this.router.navigate(["/category/1/1"]);
  }
  polishDiamonds() {
    this.router.navigate(["/category/1/2"]);
  }
  rawDiamonds() {
    this.router.navigate(["/category/1/3"]);
  }
  shopall() {
    this.router.navigate(["/category/0/0"]);
  }
  accountability() {
    this.router.navigate(["/accountability"]);
  }
  commitment() {
    this.router.navigate(["/commitment"]);
  }
  about() {
    this.router.navigate(["/about"]);
  }
  contact() {
    this.router.navigate(["/contact"]);
  }

  // Sign In Popup =======================================
  isVisible = false;
  isConfirmLoading = false;
  signIn(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 400);
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  // Sign Up Popup =======================================
  isVisible1 = false;
  isConfirmLoading1 = false;
  signUp(): void {
    setTimeout(() => {
      this.isVisible1 = true;
    }, 400);
  }
  handleOk1(): void {
    this.isConfirmLoading1 = true;
    setTimeout(() => {
      this.isVisible1 = false;
      this.isConfirmLoading1 = false;
    }, 1000);
  }
  handleCancel1(): void {
    this.isVisible1 = false;
  }
  // Reset Popup =======================================
  isVisible2 = false;
  isConfirmLoading2 = false;
  resetPass(): void {
    this.isVisible2 = true;
  }
  handleOk2(): void {
    this.isConfirmLoading2 = true;
    setTimeout(() => {
      this.isVisible2 = false;
      this.isConfirmLoading2 = false;
    }, 1000);
  }
  handleCancel2(): void {
    this.isVisible2 = false;
  }
  checked = true;
  // Reset Popup Conditions=======================================
  isVisible3 = false;
  isConfirmLoading3 = false;
  resetPassConditions(): void {
    this.isVisible3 = true;
  }
  handleOk3(): void {
    this.isConfirmLoading3 = true;
    setTimeout(() => {
      this.isVisible3 = false;
      this.isConfirmLoading3 = false;
    }, 1000);
  }
  handleCancel3(): void {
    this.isVisible3 = false;
  }
  // Reset Popup Conditions=======================================
  isVisible4 = false;
  isConfirmLoading4 = false;
  resetPassword(): void {
    this.isVisible4 = true;
  }
  handleOk4(): void {
    this.isConfirmLoading4 = true;
    setTimeout(() => {
      this.isVisible4 = false;
      this.isConfirmLoading4 = false;
    }, 1000);
  }
  handleCancel4(): void {
    this.isVisible4 = false;
  }
  // Reset Popup Conditions=======================================
  isVisible5 = false;
  isConfirmLoading5 = false;
  subscribeFrom(): void {
    setTimeout(() => {
      this.isVisible5 = true;
    }, 400);
  }
  handleOk5(): void {
    this.isConfirmLoading5 = true;
    setTimeout(() => {
      this.isVisible5 = false;
      this.isConfirmLoading5 = false;
    }, 1000);
  }
  handleCancel5(): void {
    this.isVisible5 = false;
  }
  // Terms Conditions=======================================
  isVisible11 = false;
  isConfirmLoading11 = false;
  termConditions(): void {
    setTimeout(() => {
      this.isVisible11 = true;
    }, 400);
  }
  handleCancel11(): void {
    this.isVisible11 = false;
  }
  // Privacy Policy Conditions=======================================
  isVisible12 = false;
  isConfirmLoading12 = false;
  privacyPolicy(): void {
    setTimeout(() => {
      this.isVisible12 = true;
    }, 400);
  }
  handleCancel12(): void {
    this.isVisible12 = false;
  }
  closeCookie(event: any) {
    const ringFilter: any = document.querySelector(".cookie-policy");
    ringFilter.classList.remove("in");
  }
  // Add class in banner on home page
  homeActive() {
    setTimeout(() => {
      const bannerload: any = document.querySelector(".banner-text");
      bannerload.classList.add("in");
    }, 500);
  }

  // Cart popup ================================================
  cartVisible = false;
  isConfirmLoading13 = false;
  openCart(): void {
    setTimeout(() => {
      this.cartVisible = true;
    }, 400);
  }
  cartCancel(): void {
    this.cartVisible = false;
  }
  // product count
  proValue = 1;
  // next step
  onClickNext() {
    const stepRemove: any = document.querySelector(".step-outer");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".cart-step-wrap");
    step2.style.marginLeft = "-100%";
    const step2Active: any = document.querySelector(".cart-step2");
    step2Active.classList.add("active");
  }
  onClickBack() {
    const stepRemove: any = document.querySelector(".step-outer");
    stepRemove.classList.remove("active");
    const step2: any = document.querySelector(".cart-step-wrap");
    step2.style.marginLeft = "0%";
    const step2Active: any = document.querySelector(".cart-step1");
    step2Active.classList.add("active");
  }

  // // step 2
  checkoutStep1() {
    const stepbar0: any = document.querySelector(".step-bar2");
    stepbar0.classList.remove("active");
    const stepbar012: any = document.querySelector(".step-bar3");
    stepbar012.classList.remove("active");
    const stepbar01: any = document.querySelector(".step-bar1");
    stepbar01.classList.add("active");
    const stepRemove0: any = document.querySelector(".checkout-step2");
    stepRemove0.classList.remove("active");
    const stepRemove01: any = document.querySelector(".checkout-step3");
    stepRemove01.classList.remove("active");
    const step2Active0: any = document.querySelector(".checkout-step1");
    step2Active0.classList.add("active");
  }
  checkoutStep2() {
    const stepbar: any = document.querySelector(".step-bar1");
    stepbar.classList.remove("active");
    const stepbar0121: any = document.querySelector(".step-bar3");
    stepbar0121.classList.remove("active");
    const stepbar2: any = document.querySelector(".step-bar2");
    stepbar2.classList.add("active");
    const stepRemove01: any = document.querySelector(".checkout-step1");
    stepRemove01.classList.remove("active");
    const stepRemove011: any = document.querySelector(".checkout-step3");
    stepRemove011.classList.remove("active");
    const step2Active: any = document.querySelector(".checkout-step2");
    step2Active.classList.add("active");
  }
  checkoutStep3() {
    const stepbar31: any = document.querySelector(".step-bar1");
    stepbar31.classList.remove("active");
    const stepbar3: any = document.querySelector(".step-bar2");
    stepbar3.classList.remove("active");
    const stepbar4: any = document.querySelector(".step-bar3");
    stepbar4.classList.add("active");
    const stepRemove011: any = document.querySelector(".checkout-step1");
    stepRemove011.classList.remove("active");
    const stepRemove012: any = document.querySelector(".checkout-step2");
    stepRemove012.classList.remove("active");
    const step2Active2: any = document.querySelector(".checkout-step3");
    step2Active2.classList.add("active");
  }
  // step 2 End
  // step 3
  onClickNext2() {
    const stepRemove: any = document.querySelector(".step-outer");
    stepRemove.classList.remove("active");
    const step2Active2: any = document.querySelector(".cart-step2");
    step2Active2.classList.remove("active");
    const step2: any = document.querySelector(".cart-step-wrap");
    step2.style.marginLeft = "-200%";
    const step2Active: any = document.querySelector(".cart-step3");
    step2Active.classList.add("active");
  }
  // step3 end
  chooseAddress = 1;
  choosePayment = 1;

  // My Account Popup ================================================
  accountVisible = false;
  isConfirmLoading14 = false;
  activeTabIndex = "0";
  openAccount(event: any): void {
    setTimeout(() => {
      this.activeTabIndex = event;
      this.accountVisible = true;
      setTimeout(() => {
        //  Scrollbar.init(<HTMLElement>document.querySelector('#scroller'));
        //  Scrollbar.init(<HTMLElement>document.querySelector('#scroller2'));
      }, 400);
    }, 400);
  }
  accountCancel(): void {
    this.accountVisible = false;
  }
  // my account tab

  // open order history details
  openOrderDetails() {
    const orderDetails: any = document.querySelector(".no-order-history");
    orderDetails.classList.add("d-none");
    const orderDetails2: any = document.querySelector(
      ".product-detail-wrapper"
    );
    orderDetails2.classList.remove("d-none");
  }
  // Chart
  chart: any;
  chartOptions = {
    animationEnabled: false,
    theme: " ",
    title: {
      text: "",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      title: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        showInLegend: false,
        xValueFormatString: "MMM DD, YYYY",
        dataPoints: [
          { x: new Date(2022, 0, 1), y: 300 },
          { x: new Date(2022, 1, 1), y: 300 },
          { x: new Date(2022, 2, 1), y: 300 },
          { x: new Date(2022, 3, 1), y: 300 },
          { x: new Date(2022, 4, 1), y: 300 },
          { x: new Date(2022, 5, 1), y: 300 },
        ],
      },
    ],
  };
  // open and close payment history
  openHistory(event: any) {
    const openOverlay: any = document.querySelector(".payment-history");
    openOverlay.classList.add("active");
    Scrollbar.init(<HTMLElement>document.querySelector("#scroller"));
  }
  closeHistory(event: any) {
    const openOverlay2: any = document.querySelector(".payment-history");
    openOverlay2.classList.remove("active");
  }
  openProfit1(event: any) {
    const openOverlay3: any = document.querySelector(".info-details");
    openOverlay3.classList.add("active");
  }
  closeProfit1(event: any) {
    const openOverlay4: any = document.querySelector(".info-details");
    openOverlay4.classList.remove("active");
  }
  openProfit2(event: any) {
    const openOverlay3: any = document.querySelector(".initiative-details");
    openOverlay3.classList.add("active");
    Scrollbar.init(<HTMLElement>document.querySelector("#scroller2"));
  }
  closeProfit2(event: any) {
    const openOverlay4: any = document.querySelector(".initiative-details");
    openOverlay4.classList.remove("active");
  }
  // open and close my account edit form
  openEdit(event: any) {
    const opedEdit: any = document.querySelector(".account-outer");
    opedEdit.classList.add("not-active");
    const opedEdit2: any = document.querySelector(".edit-account");
    opedEdit2.classList.remove("not-active");
  }
  closeEdit(event: any) {
    const opedEdit3: any = document.querySelector(".account-outer");
    opedEdit3.classList.remove("not-active");
    const opedEdit4: any = document.querySelector(".edit-account");
    opedEdit4.classList.add("not-active");
  }
  // open and close my account edit form end(My Account tab)
  // show History option (Order history tab)
  showHistory() {
    const orderHistory: any = document.querySelector(".no-history");
    orderHistory.classList.add("d-none");
    const orderHistory2: any = document.querySelector(".account-order-history");
    orderHistory2.classList.remove("d-none");
  }
  // show wishlist option (Wishlist tab)
  showWishlist() {
    const wishlist: any = document.querySelector(".no-wishlist");
    wishlist.classList.add("d-none");
    const wishlist2: any = document.querySelector(".wishlist-info-outer");
    wishlist2.classList.remove("d-none");
  }
  // open add new address option (Address book tab)
  openAddAddress() {
    const openadddress: any = document.querySelector(".no-address");
    openadddress.classList.add("d-none");
    const openadddress1: any = document.querySelector(".add-new-address-outer");
    openadddress1.classList.remove("d-none");
  }
  cancelAddress() {
    const address2: any = document.querySelector(".no-address");
    address2.classList.remove("d-none");
    const address3: any = document.querySelector(".add-new-address-outer");
    address3.classList.add("d-none");
  }
  saveAddress() {
    const address4: any = document.querySelector(".show-address");
    address4.classList.remove("d-none");
    const address5: any = document.querySelector(".add-new-address-outer");
    address5.classList.add("d-none");
  }
  addAddress() {
    const address6: any = document.querySelector(".add-new-address-outer");
    address6.classList.remove("d-none");
    const address7: any = document.querySelector(".show-address");
    address7.classList.add("d-none");
  }
  // order history table data
  pageSize = 5;
  pageIndex = 1;
  listOfData: Person[] = [
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
    {
      orderId: "#DC12D4RFG32FDY",
      date: "01-04-2022",
      status: "Completed",
      description: "Product name...",
      price: "$3,200",
    },
  ];
  // my account wishlist product
  wishlistDatas = [
    {
      img: "../../../assets/img/ring-1.png",
      isWishlist: false,
      name: "Classic Round Signature Yellow Gold",
      details: "18K Yellow, 0.63ct, Color/Clarity:  M/SI2",
      price: "3,246.52",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/ring-2.png",
      isWishlist: false,
      name: "Classic Round Signature Yellow Gold",
      details: "18K Yellow, 0.63ct, Color/Clarity:  M/SI2",
      price: "3,246.52",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/ring-3.png",
      isWishlist: false,
      name: "Classic Oval Solitaire Ring ",
      details: "18K Yellow, 0.71ct, Color/Clarity:  I/SI1",
      price: "3,372.52",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/ring-4.png",
      isWishlist: false,
      name: "Classic Oval Solitaire Ring ",
      details: "18K Yellow, 0.76ct, Color/Clarity:  K/SI1",
      price: "3,570.65",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/ring-5.png",
      isWishlist: false,
      name: "Classic Oval Solitaire Ring ",
      details: "18K Yellow, 0.41ct, Color/Clarity:  F/SI2",
      price: "3,298.36",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/ring-6.png",
      isWishlist: false,
      name: "Classic Oval Solitaire Ring ",
      details: "18K Yellow, 0.53ct, Color/Clarity: E/VVS",
      price: "2,516.55",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/ring-7.png",
      isWishlist: false,
      name: "Classic Oval Solitaire Ring ",
      details: "18K Yellow, 0.45ct, Color/Clarity:  F/VVS",
      price: "2,025.43",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
  ];
  isWishlist: boolean = false;
  wishlist1(wishlistData: any) {
    wishlistData.isWishlist = !wishlistData.isWishlist;
  }
  // END ========================================================
}

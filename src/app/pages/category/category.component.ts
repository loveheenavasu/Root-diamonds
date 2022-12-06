import { Location } from "@angular/common";
import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";
import { HomeService } from "src/app/services/home.service";
// import Scrollbar from 'smooth-scrollbar';

type filterModal = {
  metal: [];
  style: [];
  carat: [];
  price: {
    min: "";
    max: "";
  };
  color: [];
  cut: [];
  shape: [];
  clarity: [];
};
type videoModal = {
  mime_type?: string;
  url?: string;
};
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  outerIndex: any = 0;
  innerIndex: any = 0;
  videoSource: videoModal = {
    mime_type: "",
    url: "",
  };
  @ViewChild("videoPlayer") videoplayer: any;
  @HostListener("window:orientationchange", ["$event"])
  onOrientationChange(event: any) {
    window.location.reload();
  }
  checkWholeSaleForm: FormGroup;
  full_name: FormControl = new FormControl();
  company_name: FormControl = new FormControl();
  tax_no: FormControl = new FormControl();
  company_email: FormControl = new FormControl();
  categoryWiseProduct: any;
  filters: filterModal = {
    metal: [],
    style: [],
    carat: [],
    price: { min: "", max: "" },
    color: [],
    cut: [],
    shape: [],
    clarity: [],
  };
  metalFilter: any = [];
  caratFilter: any = [];
  styleFilter: any = [];
  colorFilter: any = [];
  cutFilter: any = [];
  shapeFilter: any = [];
  clarityFilter: any = [];
  rangeValue: any = [];
  metalVal: any = [];
  caratSelectedval: any = [];
  styleSelectedVal: any = [];
  colorSelectedVal: any = [];
  cutSelectrdVal: any = [];
  shapeSelectedVal: any = [];
  claritySelectedVal: any = [];
  categoryFilter: any = [];
  categoryValue: any = [];
  setPriceValue: any = [];
  productDetail: any = [];
  price: any = {};
  public startedPlay: boolean = false;
  public show: boolean = false;
  newPrice: number = 0;
  checkIsWholeSale: boolean = false;
  apiData: any = {};
  productPageLoading = true;
  newActiveTab: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctgysrv: CategoryService,
    private homesrv: HomeService,
    private location: Location
  ) {
    this.checkWholeSaleForm = new FormGroup({
      full_name: this.full_name,
      company_name: this.company_name,
      tax_no: this.tax_no,
      company_email: this.company_email,
    });
  }

  initialFilterLoad(catID?: string | number) {
    this.ctgysrv.fetchFiltesr(catID).subscribe((data: any) => {
      this.filters = data;

      this.price = {
        min: parseInt(this?.filters?.price?.min || "0"),
        max: parseInt(this?.filters?.price?.max || "0") + 1,
      };

      this.metalFilter = this.filters.metal.map((item) => {
        return { label: item, value: item };
      });

      this.caratFilter = this.filters.carat.map((item) => {
        return { label: item, value: item };
      });

      this.colorFilter = this.filters.color.map((item) => {
        return { label: item, value: item };
      });

      this.cutFilter = this.filters.cut.map((item) => {
        return { label: item, value: item };
      });

      this.shapeFilter = this.filters.shape.map((item) => {
        return { label: item, value: item };
      });

      this.clarityFilter = this.filters.clarity.map((item) => {
        return { label: item, value: item };
      });

      this.styleFilter = this.filters.style.map((item) => {
        return { label: item, value: item };
      });
      this.rangeValue = [
        parseInt(data?.price?.min),
        parseInt(data?.price?.max + 1),
      ];
    });
  }

  openLink(categoryName: string) {
    localStorage.setItem("activeCatTab", categoryName);
  }

  ngOnInit(): void {
    let activeCatTab: any = {
      Polish: 1,
      Raw: 2,
      "Shop all": 0,
    };
    let activeTab: any = localStorage.getItem("activeCatTab");
    this.outerIndex = activeCatTab[activeTab];

    this.ctgysrv.fetchCategoryWiseProduct().subscribe((data: any) => {
      this.categoryWiseProduct = data;
      this.productPageLoading = false;
      this.categoryFilter = this.categoryWiseProduct.map((item: any) => {
        return { label: item.name, value: item.term_id };
      });
    });

    // this.ctgysrv.fetchFiltesr().subscribe((data: any) => {
    //   this.filters = data;

    //   this.price = {
    //     min: parseInt(this?.filters?.price?.min || "0"),
    //     max: parseInt(this?.filters?.price?.max || "0") + 1,
    //   };

    //   this.metalFilter = this.filters.metal.map((item) => {
    //     return { label: item, value: item };
    //   });

    //   this.caratFilter = this.filters.carat.map((item) => {
    //     return { label: item, value: item };
    //   });

    //   this.colorFilter = this.filters.color.map((item) => {
    //     return { label: item, value: item };
    //   });

    //   this.cutFilter = this.filters.cut.map((item) => {
    //     return { label: item, value: item };
    //   });

    //   this.shapeFilter = this.filters.shape.map((item) => {
    //     return { label: item, value: item };
    //   });

    //   this.clarityFilter = this.filters.clarity.map((item) => {
    //     return { label: item, value: item };
    //   });

    //   this.styleFilter = this.filters.style.map((item) => {
    //     return { label: item, value: item };
    //   });
    //   this.rangeValue = [
    //     parseInt(data?.price?.min),
    //     parseInt(data?.price?.max + 1),
    //   ];
    // });
    this.initialFilterLoad();

    // Scroll to Top ======================================
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    // Fixed Header ======================================
    const headerClass: any = document.querySelector("body");
    headerClass.classList.remove("fixed-header");
    headerClass.classList.remove("home");
    headerClass.classList.remove("home");
    const headerClass1: any = document.querySelector("header");
    headerClass1.classList.add("shop-page");

    // Tabs Condition ====================================
    // this.route.params.subscribe((params: any) => {
    //   this.outerIndex = params['id'];
    //   this.innerIndex = params['id1'];
    //   if(this.outerIndex == 0){
    //     localStorage.setItem('scroll','1');
    //   }else{
    //     localStorage.setItem('scroll','2');
    //   }

    //   // this.innerIndex = 0;
    // });

    // const homeFixed: any = document.querySelector('body');
    // homeFixed.classList.remove('home');
    // const headerClass: any = document.querySelector('header');
    // headerClass.classList.add('shop-page');
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  selectedTab = 0;

  getFilters(catID: string | number) {
    this.initialFilterLoad(catID);
  }

  clearFilter(id: number) {
    this.appliedFilters = [];
    this.productPageLoading = true;
    this.ctgysrv
      .filterWiseProduct(id, "", "", "", "", "yes", "", "", "", "", "", "")
      .subscribe((data: any) => {
        this.categoryWiseProduct = data;
        this.productPageLoading = false;
      });
    this.selectedTab = id;
    this.styleSelectedVal = [];
    this.caratSelectedval = [];
    this.metalVal = [];
    this.setPriceValue = [];
    this.colorSelectedVal = [];
    this.cutSelectrdVal = [];
    this.shapeSelectedVal = [];
    this.claritySelectedVal = [];
    this.metalFilter = this.filters.metal.map((item) => {
      return { label: item, value: item };
    });
    this.rangeValue = [
      parseFloat(this.filters?.price?.min),
      parseFloat(this.filters?.price?.max),
    ];
    this.caratFilter = this.filters.carat.map((item) => {
      return { label: item, value: item };
    });

    this.styleFilter = this.filters.carat.map((item) => {
      return { label: item, value: item };
    });

    this.colorFilter = this.filters.color.map((item) => {
      return { label: item, value: item };
    });
    this.cutFilter = this.filters.cut.map((item) => {
      return { label: item, value: item };
    });
    this.shapeFilter = this.filters.shape.map((item) => {
      return { label: item, value: item };
    });
    this.clarityFilter = this.filters.clarity.map((item) => {
      return { label: item, value: item };
    });
  }

  categoryOnChange(event: any) {
    this.categoryValue = [];
    if (event) {
      event.forEach((el: any) => {
        if (el?.checked) {
          this.categoryValue.push(el.value);
        }
      });
      this.categoryValue = this.categoryValue.toString();
    }
  }
  metalOnChange(event: any) {
    this.metalVal = [];
    if (event) {
      event.forEach((el: any) => {
        if (el?.checked) {
          this.metalVal.push(el.value);
        }
      });
      this.metalVal = this.metalVal.toString();
    }
  }
  rangeOnChange(event: any) {
    console.log("event", event);
    this.setPriceValue = event;
  }
  styleOnChange(event: any) {
    this.styleSelectedVal = [];
    if (event) {
      event.forEach((ev: any) => {
        if (ev?.checked) {
          this.styleSelectedVal.push(ev.value);
        }
      });
      this.styleSelectedVal = this.styleSelectedVal.toString();
    }
  }

  caratOnChange(event: any) {
    this.caratSelectedval = [];
    if (event) {
      event.forEach((e: any) => {
        if (e?.checked) {
          this.caratSelectedval.push(e.value);
        }
      });
      this.caratSelectedval = this.caratSelectedval.toString();
    }
  }

  colorOnChange(event: any) {
    this.colorSelectedVal = [];
    if (event) {
      event.forEach((e: any) => {
        if (e?.checked) {
          this.colorSelectedVal.push(e.value);
        }
      });
      this.colorSelectedVal = this.colorSelectedVal.toString();
    }
  }

  cutOnChange(event: any) {
    this.cutSelectrdVal = [];
    if (event) {
      event.forEach((e: any) => {
        if (e?.checked) {
          this.cutSelectrdVal.push(e.value);
        }
      });
      this.cutSelectrdVal = this.cutSelectrdVal.toString();
    }
  }

  shapeOnChange(event: any) {
    this.shapeSelectedVal = [];
    if (event) {
      event.forEach((e: any) => {
        if (e?.checked) {
          this.shapeSelectedVal.push(e.value);
        }
      });
      this.shapeSelectedVal = this.shapeSelectedVal.toString();
    }
  }

  clarityOnChange(event: any) {
    this.claritySelectedVal = [];
    if (event) {
      event.forEach((e: any) => {
        if (e?.checked) {
          this.claritySelectedVal.push(e.value);
        }
      });
      this.claritySelectedVal = this.claritySelectedVal.toString();
    }
  }

  appliedFilters: any = [];

  getCategoryId(id: any) {}

  applyFilter(id: any) {
    this.productPageLoading = true;
    this.appliedFilters = [];

    this.ctgysrv
      .filterWiseProduct(
        id || this.selectedTab,
        this.metalVal,
        this.styleSelectedVal,
        this.setPriceValue[0],
        this.setPriceValue[1],
        "no",
        "",
        this.caratSelectedval,
        this.claritySelectedVal,
        this.colorSelectedVal,
        this.cutSelectrdVal,
        this.shapeSelectedVal
      )
      .subscribe((data: any) => {
        this.categoryWiseProduct = data;
        this.productPageLoading = false;
      });

    const filtersObj = {
      carat: this.caratSelectedval?.split?.(",") || [],
      color: this.colorSelectedVal?.split?.(",") || [],
      cut: this.cutSelectrdVal?.split?.(",") || [],
      clarity: this.claritySelectedVal?.split?.(",") || [],
      shape: this.shapeSelectedVal?.split?.(",") || [],
    };

    for (let [key, value] of Object.entries(filtersObj)) {
      value.forEach((val: any) => {
        this.appliedFilters.push({
          type: key,
          value: val,
        });
      });
    }

    console.log(this.appliedFilters, "<><><><><>");
  }

  // this.caratFilter = this.filters.carat.map((item) => {
  //   return { label: item, value: item };
  // });

  // this.colorFilter = this.filters.color.map((item) => {
  //   return { label: item, value: item };
  // });

  // this.cutFilter = this.filters.cut.map((item) => {
  //   return { label: item, value: item };
  // });

  // this.shapeFilter = this.filters.shape.map((item) => {
  //   return { label: item, value: item };
  // });

  // this.clarityFilter = this.filters.clarity.map((item) => {
  //   return { label: item, value: item };
  // });

  removeFilter(filter: any, catId: any) {
    // debugger;
    this.appliedFilters = this.appliedFilters.filter(
      (flt: any) => !(flt.key === filter.key && flt.value === filter.value)
    );

    let field: keyof CategoryComponent | "" = "";
    let checkedField: keyof CategoryComponent | "" = "";

    switch (filter.type) {
      case "color":
        field = "colorSelectedVal";
        checkedField = "colorFilter";
        break;
      case "carat":
        field = "caratSelectedval";
        checkedField = "caratFilter";
        break;
      case "cut":
        field = "cutSelectrdVal";
        checkedField = "cutFilter";
        break;
      case "clarity":
        field = "claritySelectedVal";
        checkedField = "clarityFilter";
        break;
      case "shape":
        checkedField = "shapeFilter";
        field = "shapeSelectedVal";
        break;
    }

    if (field) {
      let values =
        typeof this[field] === "string" ? this[field].split(",") : [];
      values = values.filter((flt: any) => flt != filter.value);
      this[field] = values.toString();

      this.applyFilter(catId);
    }

    if (checkedField) {
      this[checkedField] = this[checkedField].map((field: any) => {
        if (field.value === filter.value) {
          return {
            ...field,
            checked: false,
          };
        }
        return field;
      });
    }
  }

  // Shop All Filter
  shopAllFilter(event: any) {
    const ringFilter: any = document.querySelector(".shop-all-wrap");
    ringFilter.classList.add("active");
  }
  shopAllFilterClose(event: any) {
    const ringFilter: any = document.querySelector(".shop-all-wrap");
    ringFilter.classList.remove("active");
  }
  // Ring Filter Open & Close
  ringsFilter(event: any) {
    const ringFilter: any = document.querySelector(".ringsFilter");
    ringFilter.classList.add("active");
  }
  ringsFilterClose(event: any) {
    const ringFilter: any = document.querySelector(".ringsFilter");
    ringFilter.classList.remove("active");
  }
  // Ring Filter Open & Close
  earringsFilter(event: any) {
    const earringsFilter: any = document.querySelector(".earringsFilter");
    earringsFilter.classList.add("active");
  }
  earringsFilterClose(event: any) {
    const earringsFilter: any = document.querySelector(".earringsFilter");
    earringsFilter.classList.remove("active");
  }
  // Ring Filter Open & Close
  polishedFilter(event: any) {
    const polishedFilter: any = document.querySelector(".polishedFilter");
    polishedFilter.classList.add("active");
  }
  polishedFilterClose(event: any) {
    const polishedFilter: any = document.querySelector(".polishedFilter");
    polishedFilter.classList.remove("active");
  }
  // Ring Filter Open & Close
  rawFilter(event: any) {
    const rawFilter: any = document.querySelector(".rawFilter");
    rawFilter.classList.add("active");
  }
  rawFilterClose(event: any) {
    const rawFilter: any = document.querySelector(".rawFilter");
    rawFilter.classList.remove("active");
  }

  onChange(value: number): void {}

  onAfterChange(value: number[] | number): void {}

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
  // Shop all
  // Category - Ring ==========================================
  rings = [
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
  // Category - Earing =================================================
  earings = [
    {
      img: "../../../assets/img/earing-1.png",
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
      img: "../../../assets/img/earing-5.png",
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
      img: "../../../assets/img/earing-3.png",
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
      img: "../../../assets/img/earing-4.png",
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
      img: "../../../assets/img/earing-5.png",
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
      img: "../../../assets/img/earing-6.png",
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
      img: "../../../assets/img/earing-7.png",
      isWishlist: false,
      name: "Classic Round Signature Yellow Gold",
      details: "18K Yellow, 0.63ct, Color/Clarity:  M/SI2",
      price: "3,246.52",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
  ];
  // Category - Polish =====================================================
  polishs = [
    {
      img: "../../../assets/img/shop/webp/polish-1.png",
      isWishlist: false,
      name: "0.63 CARAT",
      details: "M/SI2",
      price: "3,247",
      onwerImg: "../../../assets/img/shop/webp/owner-thumb-img-1.png",
      overTitle: "Sia Senesi",
      overDes:
        "She lives in Kono, Sierra Leone with her 3 children and husband. Business: Sia‘s goal is to use her funds to become an Agro Entrepreneur Processing. This involves planting and selling agricultural produce by becoming a market vendor.",
    },
    {
      img: "../../../assets/img/shop/webp/polish-2.png",
      isWishlist: false,
      name: "0.99 CARAT",
      details: "J/SI3",
      price: "5,139",
      onwerImg: "../../../assets/img/shop/webp/owner-thumb-img-2.png",
      overTitle: "Denis Komba",
      overDes:
        "Denis Komba has one child at university and several younger kids in secondary school. He is planning to use the money from Root Diamonds to make sure all of his children can attend university, buy a home, and fund his wife’s business aspirations. Business: Wants to provide start-up capital for his Wife. His Wife plans to start a local store for a food catering business. Sadly We found out that Denis has passed away. We plan to give the funds to his family to fulfill their dreams of starting a business.",
    },
    {
      img: "../../../assets/img/shop/webp/polish-3.png",
      isWishlist: false,
      name: "0.71 CARAT",
      details: "I/SI1",
      price: "3,373",
      onwerImg: "../../../assets/img/shop/webp/owner-thumb-img-3.png",
      overTitle: "Hawa Jabbie",
      overDes:
        "Hawa Jabbie took over the land for her husband when he passed away. She once was with him when he found a 10 carat stone on their land. As a single mother she is working to put her 5 kids through school and keep a roof over their head. Business: Hawa’s goal is to use her funds to become an Agro Entrepreneur Processing. This involves planting and selling agricultural produce by becoming a market vendor.",
    },
    {
      img: "../../../assets/img/shop/webp/polish-4.png",
      isWishlist: false,
      name: "0.76 CARAT",
      details: "K/SI1",
      price: "3,571",
      onwerImg: "../../../assets/img/shop/webp/owner-thumb-img-4.png",
      overTitle: "Sahr Timbo",
      overDes:
        "Sahr Timbo is needing money so that they can build their own home, they are currently living with all of their extended family under one roof. Sahr has been mining for years and says that companies will tell the miners they will be paid well, then leave the country before paying what is owed. Business:Building homes",
    },
    {
      img: "../../../assets/img/shop/webp/polish-5.png",
      isWishlist: false,
      name: "0.41 CARAT",
      details: "F/SI2",
      price: "3,299",
      onwerImg: "../../../assets/img/shop/webp/owner-thumb-img-5.png",
      overTitle: "Chief Aiah Baffor",
      overDes:
        "Chief Aiah Baffor has owned their land for over 14 years now, and they rely on it to take care of 6 children and 9 grandchildren.In the past they have relied on foreign diamond companies to provide equipment to mine the land, but payment has not been consistent. Baffor believes that working with Root Diamonds will provide a more secure life for his family. Business: Aliah Baffor’s goal is to use his funds to become an Agro Entrepreneur Processing. This involves planting and selling agricultural produce by becoming a market vendor.",
    },
    {
      img: "../../../assets/img/shop/webp/polish-6.png",
      isWishlist: false,
      name: "0.53 CARAT",
      details: "E/VVS",
      price: "2,517",
      onwerImg: "../../../assets/img/shop/webp/owner-thumb-img-6.png",
      overTitle: "Chief Kemoh",
      overDes:
        "Chief Kemoh has abandoned their plot of land that they used to mine because they were not being paid anything for their hours of hard labor. Most of Chief Kemoh children have dropped out of school because he cannot afford to support them. Chief Kemoh plans to build his family a home and send all of his children back to school with his wages from Root Diamonds. Business: Loan facilities to assist families in need.",
    },
  ];
  // Category - Raw ==================================
  raws = [
    {
      img: "../../../assets/img/raw-1.png",
      isWishlist: false,
      name: "0.50 carat",
      details: "M/I2",
      price: "840.00",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/raw-2.png",
      isWishlist: false,
      name: "0.33 carat",
      details: "L/VVS",
      price: "840.00",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
    {
      img: "../../../assets/img/raw-3.png",
      isWishlist: false,
      name: "0.60 carat",
      details: "I/I2",
      price: "2,772.00 ",
      onwerImg: "../../../assets/img/landowner-small.png",
      overTitle: "Food Catering, Bakery ",
      overDes:
        "Background info on Sia Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ",
    },
  ];

  // Filters options
  filterStyle = [
    { label: "Plain", value: "value1" },
    { label: "Half eternity", value: "value2" },
    { label: "Full eternity", value: "value3" },
    { label: "Stacking", value: "value4" },
    { label: "Signet", value: "value5" },
    { label: "Other rings", value: "value6" },
  ];
  filterStyleEaring = [
    { label: "Stud earrings", value: "value1" },
    { label: "Hoop earrings", value: "value2" },
    { label: "Drop earrings", value: "value3" },
    { label: "jackets", value: "value4" },
  ];
  filtercarot = [
    { label: "Under 1/4", value: "value1" },
    { label: "Under 1/4 to Under 1/2", value: "value2" },
    { label: "1/2 to 1", value: "value3" },
  ];
  filtercolor = [
    { label: "D", value: "value1" },
    { label: "E", value: "value2" },
    { label: "F", value: "value3" },
    { label: "G", value: "value4" },
    { label: "H", value: "value5" },
    { label: "I", value: "value6" },
  ];
  filtercut = [
    { label: "Very Good", value: "value1" },
    { label: "Ideal", value: "value2" },
    { label: "Super Ideal", value: "value3" },
  ];
  filterclarity = [
    { label: "IF", value: "value1" },
    { label: "VVSI", value: "value2" },
    { label: "VVS2", value: "value3" },
    { label: "VS1", value: "value4" },
    { label: "VS2", value: "value5" },
    { label: "SI1", value: "value6" },
  ];
  filtershape = [
    { label: "Round", value: "value1" },
    { label: "Oval", value: "value2" },
  ];
  // Modal Product slider =============================================
  productSlider = {
    slidesToShow: 1,
    arrows: false,
    fade: true,
    dots: false,
    asNavFor: ".pro-carousel-thumbnail",
    adaptiveHeight: true,
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
  productPolishs = [
    { img: "../../../assets/img/shop/polish1.png", alt: "Image 1" },
    { img: "../../../assets/img/shop/polish2.png", alt: "Image 2" },
    { img: "../../../assets/img/shop/polish3.png", alt: "Image 3" },
  ];
  productRaws = [
    { img: "../../../assets/img/shop/raw1.png", alt: "Image 1" },
    { img: "../../../assets/img/shop/raw2.png", alt: "Image 2" },
    { img: "../../../assets/img/shop/raw3.png", alt: "Image 3" },
  ];

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  // Earing
  isVisible2 = false;
  showModal2(): void {
    this.isVisible2 = true;
  }
  handleOk2(): void {
    this.isVisible2 = false;
  }
  handleCancel2(): void {
    this.isVisible2 = false;
  }

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
  // Polish
  isVisible3 = false;
  showModal3(product: object): void {
    this.productDetail = product;
    this.clearWholeSaleDetails();
    this.isVisible3 = true;
  }
  wholeSaleChange(bool: any, price: any) {
    this.checkIsWholeSale = bool;
    this.homesrv.getProductById(bool).subscribe((data: any) => {
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

  fillWholeSaleForm = false;
  isWholeSaleVisible = false;
  onSubmitWholeSale(bol: boolean) {
    if (bol) {
      this.isWholeSaleVisible = false;
      this.fillWholeSaleForm = true;
    }
  }

  clearWholeSaleDetails() {
    this.isWholeSaleChecked = false;
    this.fillWholeSaleForm = false;
    this.checkWholeSaleForm.reset();
  }

  showModalWholeSale() {
    this.isWholeSaleVisible = true;
  }
  handleWholeSaleCancle() {
    this.isWholeSaleVisible = false;
  }
  isWholeSaleChecked = false;
  changeValue(e: any) {
    this.isWholeSaleChecked = e.target.checked;
  }
  handleOk3(): void {
    this.isVisible3 = false;
  }
  handleCancel3(): void {
    this.isVisible3 = false;
  }
  // Raw
  isVisible4 = false;
  handleCancel4(): void {
    this.isVisible4 = false;
  }
  showModal4(): void {
    this.isVisible4 = true;
  }
  handleOk4(): void {
    this.isVisible4 = false;
  }

  // Modal Product slider End ==========================================
  isWishlist: boolean = false;

  wishlist1(ring: any) {
    ring.isWishlist = !ring.isWishlist;
  }
  wishlist2(earing: any) {
    earing.isWishlist = !earing.isWishlist;
  }
  wishlist3(polish: any) {
    polish.isWishlist = !polish.isWishlist;
  }
  wishlist4(raw: any) {
    raw.isWishlist = !raw.isWishlist;
  }
}

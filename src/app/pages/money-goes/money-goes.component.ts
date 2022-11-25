import { Component, OnInit , HostListener} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SignInComponent } from 'src/app/models/sign-in/sign-in.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-money-goes',
  templateUrl: './money-goes.component.html',
  styleUrls: ['./money-goes.component.scss']
})
export class MoneyGoesComponent implements OnInit {
  buttons: any;

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) { 
    window.location.reload();
}
  constructor(
    private commonS: CommonService,
    private modal: NzModalService) { }

  ngOnInit(): void {

    const headerClass: any = document.querySelector('header');
    headerClass.classList.add('shop-page');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
    const homeFixed: any = document.querySelector('body'); 
    homeFixed.classList.remove('home'); 
  }

  isVisible = false;
  isConfirmLoading = false;

  signIn(): void { 
    this.commonS.isSignInModalVisible = true;
    this.commonS.signInModal = this.modal.create({
      nzContent: SignInComponent,
    });
  } 
  handleCancel(): void { 
    this.commonS.signInModal = false;
  }
 
  owners = [
    {
      img: '../../../assets/img/owner-1.png',
      name: 'Tamba Saquee',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-2.png',
      name: 'Sia Maturi',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-3.png',
      name: 'Miata Koroma',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-5.png',
      name: 'Maturi Family',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-5.png',
      name: 'Haja Sannoh',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-6.png',
      name: ' James Sesay',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-7.png',
      name: ' Bayoh Family',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-8.png',
      name: ' Sam Bangura ',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-9.png',
      name: ' Sahr Tamba',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-10.png',
      name: 'Alhassan  Conteh',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-11.png',
      name: ' Komba Wurie',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },{
      img: '../../../assets/img/owner-12.png',
      name: ' Haja Jalloh',
      title: 'Sierra Leone',
      price: '300',
      allocated: 'Allocated monthly', 
    },
    
  ]; 
  storyOwner = {
    slidesToShow: 1,
    arrows: true, 
    dots: true,
    slidesToScroll: 1,
    draggable: false,
  };
  // view more landowner
  viewLandowner(){
    const viewmorebtn :any = document.querySelector(".accountablility-landowner");
    viewmorebtn.classList.add("active");
    
  const buttonss = document.querySelectorAll(".money-goes-pg  .slick-next,.money-goes-pg  .slick-prev,.money-goes-pg .slick-dots li");
  for (var i = 0; i < buttonss.length; i++ ) {
     
      buttonss[i].addEventListener('click', function(event: any) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 400);
    })
  }
 
} 


}
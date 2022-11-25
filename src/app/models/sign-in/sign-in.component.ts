import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  // Sign In Popup =======================================
  isVisible = false;
  // isConfirmLoading = false;
  // signIn(): void {
  //   this.isVisible = true;
  // }
  // handleOk(): void {
  //   this.isConfirmLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isConfirmLoading = false;
  //   }, 1000);
  // }
  handleCancel(): void {
    // this.isVisible = false;
    this.commonS.signInModal.triggerOk();
  }

  constructor(public commonS: CommonService) {}

  ngOnInit(): void {}
}

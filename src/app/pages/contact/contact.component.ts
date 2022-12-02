import { Component, OnInit } from "@angular/core";
import { ContactService, EmailData } from "src/app/services/contact.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  constructor(private contactsrv: ContactService) {
    this.contactus = new FormGroup({
      yourname: this.yourname,
      youremail: this.youremail,
      phonenumber: this.phonenumber,
      yourmessage: this.yourmessage,
    });
  }

  contactus: FormGroup;
  yourname: FormControl = new FormControl();
  youremail: FormControl = new FormControl();
  phonenumber: FormControl = new FormControl();
  yourmessage: FormControl = new FormControl();
  handleBtnDisable: boolean = false;
  contactSuccessResponse: string = "";
  contactFailResponse: string = "";
  ngOnInit(): void {}

  sendEmail() {
    this.handleBtnDisable = true;
    const data = {
      name: this.yourname.value,
      email: this.youremail.value,
      phone: this.phonenumber.value,
      message: this.yourmessage.value,
    };
    this.contactsrv.sendEmail(data).subscribe((results: any) => {
      this.handleBtnDisable = false;
      if (results?.data?.response_code === 200) {
        this.contactSuccessResponse = results?.data?.message;
        this.contactus.reset();
      } else {
        this.contactFailResponse = results?.data?.message;
      }
      setTimeout(() => {
        this.contactFailResponse = "";
        this.contactSuccessResponse = "";
      }, 5000);
    });
  }

  onChange() {}
}

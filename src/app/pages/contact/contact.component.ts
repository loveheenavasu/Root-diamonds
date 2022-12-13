import { Component, OnInit } from "@angular/core";
import { ContactService, EmailData } from "src/app/services/contact.service";
import { FormControl, FormGroup } from "@angular/forms";

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
    this.appointment = new FormGroup({
      InAppointment: this.InAppointment,
      desirad_datetime: this.desirad_datetime,
      yourName: this.yourName,
      yourEmail: this.yourEmail,
      yourPhoneNumber: this.yourPhoneNumber,
      yourMessage: this.yourMessage,
    });
  }

  contactus: FormGroup;
  appointment: FormGroup;
  yourname: FormControl = new FormControl();
  youremail: FormControl = new FormControl();
  phonenumber: FormControl = new FormControl();
  yourmessage: FormControl = new FormControl();

  InAppointment: FormControl = new FormControl();
  desirad_datetime: FormControl = new FormControl();
  yourName: FormControl = new FormControl();
  yourEmail: FormControl = new FormControl();
  yourPhoneNumber: FormControl = new FormControl();
  yourMessage: FormControl = new FormControl();

  handleBtnDisable: boolean = false;
  handleBtncontactus: string = "contact";
  contactSuccessResponse: string = "";
  contactFailResponse: string = "";
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  changeForm(label: any) {
    this.handleBtncontactus = label;
    throw new Error("Method not implemented.");
  }
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

  onSubmit() {
    this.handleBtnDisable = true;
    const appointData = {
      tomeet: this.InAppointment.value,
      desiraddatetime: this.desirad_datetime.value,
      name: this.yourName.value,
      email: this.yourEmail.value,
      phone: this.yourPhoneNumber.value,
      message: this.yourMessage.value,
    };
    this.contactsrv.onMakeAppoint(appointData).subscribe((result: any) => {
      this.handleBtnDisable = false;
      console.log(result, "appointData");
      this.appointment.reset();
    });
  }
}

import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { map } from "rxjs/operators";

export type EmailData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor(private cmnSrv: CommonService) {}

  sendEmail(data: EmailData): any {
    return this.cmnSrv
      .post("contact_send_email", data, {}, false, false, false)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}

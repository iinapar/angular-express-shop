import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Newcustomer } from '../newcustomer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent {
  customers: Newcustomer[] = [];
  firstname!: String;
  lastname!: String;
  email!: String;
  street!: String;
  city!: String;
  zip!: Number;
  username!: String;
  password!: String;
  succeed = false;

  constructor(private customerService: CustomerService, private router: Router) {}

  onSubmit(formData: any) {
    this.customerService
      .addCustomer({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: {
          street: formData.street,
          city: formData.city,
          zip: formData.zip,
        },
      })
      .subscribe();
    this.succeed = true;
    setTimeout(() => {
      this.succeed = false;
      this.router.navigate(['/login']);
    }, 1000);
  }
}

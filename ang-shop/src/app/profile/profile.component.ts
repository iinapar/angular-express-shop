import { Component, Input } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  customer!: Customer;
  @Input() productId!: string;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}

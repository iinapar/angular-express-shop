import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Newcustomer } from './newcustomer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Get a single customer by ID
  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // Add a new customer
  addCustomer(customer: Newcustomer): Observable<Newcustomer> {
    return this.http.post<Newcustomer>(`${this.apiUrl}/register`, customer);
  }

  // Update an existing customer
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer._id}`, customer);
  }

  // Delete a customer by ID
  deleteCustomerById(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/${id}`);
  }
}

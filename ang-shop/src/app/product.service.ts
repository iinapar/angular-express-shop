import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Product } from './product';
import { NewProduct } from './newproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  newProduct = false;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  getProductByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${category}`).pipe(catchError(this.handleError));
  }

  createProduct(product: NewProduct): Observable<NewProduct> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': mytoken.token }) };
    return this.http.post<NewProduct>(this.apiUrl, product, tokenheaders);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': mytoken.token }) };
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, tokenheaders);
  }

  deleteProduct(id: string): Observable<Product> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': mytoken.token }) };
    return this.http.delete<Product>(`${this.apiUrl}/${id}`, tokenheaders);
  }
}

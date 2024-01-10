import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewProduct } from 'src/app/newproduct';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  products: Product[] = [];
  name = '';
  description = '';
  price = 0;
  category = '';
  available = 0;
  img = '';
  succeed = false;

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(formData: any) {
    this.productService
      .createProduct({
        name: formData.name,
        shortDescription: formData.shortDescription,
        description: formData.description,
        price: formData.price,
        available: formData.available,
        category: formData.category,
        img: formData.img,
      })
      .subscribe();

    this.succeed = true;
    setTimeout(() => {
      this.succeed = false;
      this.router.navigate(['/admin']);
    }, 1000);
  }
}

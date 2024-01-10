import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product!: Product;
  succeed = false;
  @Input() productId!: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product) => (this.product = product));
  }
  onSubmit() {
    if (this.product) {
      this.productService.updateProduct(this.product._id, this.product).subscribe();
    }
  }

  save() {
    this.succeed = true;
    setTimeout(() => {
      this.succeed = false;
    }, 5000);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product!: Product;
  @Input() productId!: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product) => (this.product = product));
  }
}

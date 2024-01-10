import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  selectedProductId!: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProductByCategory();
  }

  getProductByCategory(): void {
    const category = String(this.route.snapshot.paramMap.get('category'));
    this.productService.getProductByCategory(category).subscribe((products) => {
      this.products = products;
    });
  }

  productId(productId: string) {
    this.selectedProductId = productId;
  }
}

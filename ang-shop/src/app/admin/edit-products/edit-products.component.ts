import { Component } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent {
  products: Product[] = []; // Product-tyyppinen taulukko serviceltä tulevaa dataa varten
  selectedProductId!: string;
  deleting = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => (this.products = products));
  }

  productId(productId: string) {
    this.selectedProductId = productId;
  }

  delete(): void {
    this.products = this.products.filter((product) => product._id !== this.selectedProductId);
    this.productService.deleteProduct(this.selectedProductId).subscribe();
    this.deleting = false;
  }

  close(): void {
    this.selectedProductId = '';
    window.location.reload();
  }
}
